const gapi = require('./gapi')
const { PromiseResolve } = require('local/lib')


module.exports = {
	connect () {
		return new Promise((resolve, reject) => gapi.load('client:auth2', () =>
			resolve(gapi.client.init({
				clientId: this.CLIENT_ID,
				discoveryDocs: this.DISCOVERY_DOCS,
				scope: this.AUTH_SCOPES.join(' ')
			})
				.then(() => {
					const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn

					this.on('signIn', () => gapi.client.drive.files.list({
						q: `name = "${this.DB_FILENAME}" and trashed = false`
					})
						.then(({ result: { files: [ dbFile ] } }) => dbFile
							? this._initDBFile(dbFile.id)
							: this._createDBFile()
						)
						.then(() => this._emit('init'))
					)

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
		return gapi.auth2.getAuthInstance().signOut()
	},

	on (event, cb) {
		const listeners = this.$.listeners[event]

		if (listeners)
			listeners.push(cb)
	},

	addNode (id, pid, type, data) {
		return this._ifConnected(() =>
			gapi.client.sheets.spreadsheets.values.append({
				spreadsheetId: this.$.dbFileId,
				range: 'nodes!A:A',
				valueInputOption: 'USER_ENTERED',
				insertDataOption: 'INSERT_ROWS',
			}, {
				values: [ [ id, pid, '=JOIN(",",FILTER(ROW(A:A),B:B=INDEX(A:A,ROW())))', type, ...data ] ]
			})
		)
	},

	addNodeRoot (id, type, data) {
		this.addNode(id, this.ROOT_NODE_ID, type, data)
	},

	getNodes (indexes, full) {
		return this._ifConnected(() => new Promise(resolve =>
			resolve(indexes.length
				? gapi.client.sheets.spreadsheets.values.batchGet({
					spreadsheetId: this.$.dbFileId,
					ranges: indexes.map(index => full
						? `nodes!${index}:${index}`
						: `nodes!A${index}:D${index}`
					)
				})
					.then(({ result }) => result.valueRanges.map(
						({ values: [ [ id, pid, children, type, ...data ] ] }, i) => ({
							id,
							pid,
							index: indexes[i],
							childIndexes: children.startsWith('#') ? [] : children.split(','),
							type,
							data
						})
					))
				: []
			)
		))
	},

	getRootNode () {
		return this.getNodes([ 1 ]).then(([ root ]) => root)
	},

	addNodeIndex (parentIndex, id, pid, type, data) {
		return this.addNode(id, pid, type, data)
			.then(() => this.getNodes([ parentIndex ]))
			.then(([ parent ]) => this.getNodes(parent.childIndexes))
			.then(nodes => nodes.find(node => node.id === id).index)
	},

	addNodeRootIndex (id, type, data) {
		return this.addNodeIndex(1, id, this.ROOT_NODE_ID, type, data)
	},

	updateNode (index, pid, data) {
		return this._ifConnected(() => Promise.all([
			pid && gapi.client.sheets.spreadsheets.values.update({
				spreadsheetId: this.$.dbFileId,
				range: `nodes!B${index}`,
				valueInputOption: 'USER_ENTERED'
			}, {
				values: [ [ pid ] ]
			}),
			data && gapi.client.sheets.spreadsheets.values.update({
				spreadsheetId: this.$.dbFileId,
				range: `nodes!E${index}`,
				valueInputOption: 'USER_ENTERED'
			}, {
				values: [ data ]
			})
		]))
	}
}
