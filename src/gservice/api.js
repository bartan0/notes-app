const gapi = require('./gapi')
const { PromiseResolve } = require('local/lib')

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


	/* Nodes mutations
	 * ---------------
	 */

	addNode (id, pid, type, data, order) {
		return this._ifConnected(() =>
			gapi.client.sheets.spreadsheets.values.append({
				spreadsheetId: this.$.dbFileId,
				range: 'nodes!A:A',
				valueInputOption: 'USER_ENTERED',
				insertDataOption: 'INSERT_ROWS',
			}, {
				values: [ [
					id,
					pid,
					this.FUNCTIONS.NODE_IS_REMOVED,
					1, // TODO: Should be the last somehow, verify if order arg is needed
					this.FUNCTIONS.GET_CHILD_INDEXES,
					type,
					...data
				] ]
			})
		)
	},

	addNodeRoot (id, type, data, order) {
		return this.addNode(id, this.ROOT_NODE_ID, type, data, order)
	},

	addNodeIndex (parentIndex, id, pid, type, data, order) {
		return this.addNode(id, pid, type, data, order)
			.then(() => this.getNodes([ parentIndex ]))
			.then(([ parent ]) => this.getNodes(parent.childIndexes))
			.then(nodes => nodes.find(node => node.id === id).index)
	},

	addNodeRootIndex (id, type, data, order) {
		return this.addNodeIndex(1, id, this.ROOT_NODE_ID, type, data, order)
	},

	removeNode (index) {
		return this._ifConnected(() => gvalues().update({
			spreadsheetId: this.$.dbFileId,
			range: `nodes!C${index}`,
			valueInputOption: 'RAW'
		}, {
			values: [ [ { number_value: 1 } ] ]
		}))
	},

	reorderNodes (
		{ index: i1, order: o1 },
		{ index: i2, order: o2 }
	) {
		return this._ifConnected(() => gvalues().batchUpdate({
			valueInputOption: 'RAW',
			data: [
				{ range: `nodes!D${i1}`, values: [ [ { number_value: o2 } ] ] },
				{ range: `nodes!D${i2}`, values: [ [ { number_value: o1 } ] ] }
			]
		}))
	},

	updateNode (index, data) {
		return this._ifConnected(() => Promise.all([
			gvalues().update({
				spreadsheetId: this.$.dbFileId,
				range: `nodes!G${index}`,
				valueInputOption: 'RAW'
			}, {
				values: [ data.map(x => ({ string_value: x })) ]
			})
		]))
	},


	/* Nodes queries
	 * -------------
	 */

	getRootNode (withMeta) {
		return this.getNodes([ 1 ], withMeta)
			.then(([ { data, ...root } ]) => {
				const [ removedCount, nodesCount ] = (data[0] || '').split(',')

				return withMeta
					? Object.assign(root, {
						removedCount,
						nodesCount,
						removedIndexes: data[1].split(',').map(Number)
					})
					: root
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
						({ values }, i) => ({
							index: indexes[i],
							id: values[0],
							pid: values[1],
							// Skip isDeleted: values[2] as the whole idea
							// is to filter-out removed nodes at DB level
							order: values[3],
							childIndexes: values[4].split(',').map(Number),
							type: values[5],
							data: values.slice(6)
						})
					))
				: []
			)
		))
	}
}
