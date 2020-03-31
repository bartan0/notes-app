const gapi = require('./gapi')
const { PromiseResolve, UUID, csvSplit } = require('local/lib')

const gvalues = () => gapi.client.sheets.spreadsheets.values


module.exports = {
	connect (signOut = false) {
		return new Promise((resolve, reject) => gapi.load('client:auth2', () =>
			resolve(gapi.client.init({
				clientId: this.CLIENT_ID,
				discoveryDocs: this.DISCOVERY_DOCS,
				scope: this.AUTH_SCOPES.join(' ')
			})
				.then(() => {
					const auth = gapi.auth2.getAuthInstance()
					const isSignedIn = auth.isSignedIn

					if (signOut)
						return auth.signOut()

					isSignedIn.listen(this._onSignInStatusChange(isSignedIn.get()))
				})
			)
		))
	},

	signIn () {
		const auth = gapi.auth2.getAuthInstance()

		if (!auth.isSignedIn.get())
			return auth.signIn()

		return PromiseResolve
	},

	signOut () {
		return gapi.auth2
			? gapi.auth2.getAuthInstance().signOut()
			: this.connect(true)
	},

	on (event, cb) {
		const listeners = this.$.listeners[event]

		if (listeners)
			listeners.push(cb)
	},

	setTransformers (ts) {
		this.$.transformers = ts
	},

	setNodeMethods (methods) {
		this.$.nodeMethods = methods
	},


	/* Nodes mutations
	 * ---------------
	 */

	addNode (parent, type) {
		const node = {
			index: null,
			id: UUID(),
			pid: parent.id,
			order: 1, // TODO: Should be the last somehow, verify if order arg is needed
			childIndexes: [],
			type
		}

		return this._ifConnected(() =>
			gapi.client.sheets.spreadsheets.values.append({
				spreadsheetId: this.$.dbFileId,
				range: 'nodes!A:A',
				valueInputOption: 'USER_ENTERED',
				insertDataOption: 'INSERT_ROWS',
			}, {
				values: [ [
					node.id,
					node.pid,
					this.FUNCTIONS.NODE_IS_REMOVED,
					node.order,
					this.FUNCTIONS.GET_CHILD_INDEXES,
					node.type,
					...(this.$.transformers[node.type] || this._defaultTransformer)
						.pack.call(node)
				] ]
			})
				.then(() => Object.assign(node,
					this.$.nodeMethods,
					(this.$.transformers[node.type] || {}).methods
				))
		)
	},

	/* DISABLED FOR NOW
	addNodeRoot (id, type, data, order) {
		return this.addNode(id, this.ROOT_NODE_ID, type, data, order)
	},
	*/

	addNodeIndex (parent, type) {
		return this.addNode(parent, type)
			.then(node => this.getNodes([ parent.index ])
				.then(([ { childIndexes } ]) => this.getNodes(childIndexes))
				.then(nodes => {
					node.index = nodes.find(({ id }) => id === node.id).index

					return node
				})
			)
	},

	/* DISABLED FOR NOW
	addNodeRootIndex (id, type, data, order) {
		return this.addNodeIndex(1, id, this.ROOT_NODE_ID, type, data, order)
	},
	*/

	removeNode (node, parent) {
		return this._ifConnected(() => {
			parent.childIndexes = parent.childIndexes
				.filter(({ id }) => id !== node.id)

			return gvalues().update({
				spreadsheetId: this.$.dbFileId,
				range: `nodes!C${node.index}`,
				valueInputOption: 'RAW'
			}, {
				values: [ [ 1 ] ]
			})
		})
	},

	reorderNodes (
		{ index: i1, order: o1 },
		{ index: i2, order: o2 }
	) {
		return this._ifConnected(() => gvalues().batchUpdate({
			valueInputOption: 'RAW',
			data: [
				{ range: `nodes!D${i1}`, values: [ [ o2 ] ] },
				{ range: `nodes!D${i2}`, values: [ [ o1 ] ] }
			]
		}))
	},

	updateNode (node) {
		return this._ifConnected(() => Promise.all([
			gvalues().update({
				spreadsheetId: this.$.dbFileId,
				range: `nodes!G${node.index}`,
				valueInputOption: 'RAW'
			}, {
				values: [
					(this.$.transformers[node.type] || this._defaultTransformer)
						.pack.call(node)
				]
			})
		]))
	},


	/* Nodes queries
	 * -------------
	 */

	getRootNode (withMeta) {
		return this.getNodes([ 1 ], withMeta)
			.then(([ { data, ...root } ]) => {
				const [ removedCount, nodesCount ] = csvSplit(data[0], Number)

				return Object.assign(
					withMeta
						? Object.assign(root, {
							removedCount,
							nodesCount,
							removedIndexes: csvSplit(data[1], Number)
						})
						: root,
					this.$.nodeMethods
				)
			})
	},

	getNodes (indexes, withData) {
		return this._ifConnected(() => new Promise(resolve =>
			resolve(indexes.length
				? gvalues().batchGet({
					spreadsheetId: this.$.dbFileId,
					ranges: indexes.map(index => withData
						? `nodes!${index}:${index}`
						: `nodes!A${index}:F${index}`
					)
				})
					.then(({ result }) => result.valueRanges.map(
						({ values: [ data ] }, i) => {
							const node = {
								index: indexes[i],
								id: data[0],
								pid: data[1],
								// Skip isDeleted: data[2] as the whole idea
								// is to filter-out removed nodes at DB level
								order: data[3],
								childIndexes: csvSplit(data[4], Number),
								type: data[5]
							}
							const transformer = this.$.transformers[node.type]
								|| this._defaultTransformer

							transformer.unpack.call(node, data.slice(6))

							return Object.assign(node,
								this.$.nodeMethods,
								(this.$.transformers[node.type] || {}).methods
							)
						}
					))
				: []
			)
		))
	}
}
