const gapi = require('./gapi')

module.exports = {
	_defaultTransformer: {
		pack () {
			return this.data || []
		},
		unpack (data) {
			this.data = data
		}
	},

	_init () {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				clientId: this.CLIENT_ID,
				discoveryDocs: this.DISCOVERY_DOCS,
				scope: this.AUTH_SCOPES.join(' ')
			})
				.then(() => {
					this.$.auth = gapi.auth2.getAuthInstance()
					this._emit('init')
				})
		})
	},

	_emit (event, ...args) {
		this.$.listeners[event].forEach(f => f(...args))
	},

	_checkInit () {
		if (!this.$.auth)
			throw new Error('not-initialized')
	},

	_checkSignedIn() {
		this._checkInit()

		if (!this.$.auth.isSignedIn.get())
			throw new Error('not-signed-in')
	},

	_ifConnected (action) {
		return new Promise((resolve, reject) => {
			if (!this.$.dbFileId)
				return reject('not-connected')

			resolve(action())
		})
	},

	_onSignInStatusChange (status) {
		this._emit(status ? 'signIn' : 'signOut')

		return this._onSignInStatusChange.bind(this)
	},

	_insertRootNode (spreadsheetId) {
		return gapi.client.sheets.spreadsheets.values.update({
			spreadsheetId,
			range: 'nodes!A1',
			valueInputOption: 'USER_ENTERED'
		}, {
			values: [ [
				this.ROOT_NODE_ID,
				this.ROOT_NODE_PID,
				0, // Not removed, it's not a function because root may never be removed
				0, // Order, root is only node with 0
				this.FUNCTIONS.GET_CHILD_INDEXES,
				this.ROOT_NODE_TYPE,
				this.FUNCTIONS.GET_NODE_COUNTS,
				this.FUNCTIONS.GET_REMOVED_INDEXES
			] ]
		})
			.then(() => spreadsheetId)
	},

	_createDBFile () {
		return gapi.client.sheets.spreadsheets.create({
			properties: {
				title: this.DB_FILENAME,
				locale: this.DB_LOCALE
			},
			sheets: [ { properties: { title: 'nodes' } } ]
		})
			.then(({ result: { spreadsheetId: id } }) => this._insertRootNode(id))
			.then(id => {
				this.$.dbFileId = id
			})
	},

	_initDBFile (spreadsheetId) {
		return gapi.client.sheets.spreadsheets.get({ spreadsheetId })
			.then(({ result: { sheets } }) => {
				if (!sheets.find(({ properties: { title } }) => title === 'nodes'))
					return gapi.client.sheets.spreadsheets.batchUpdate({
						spreadsheetId,
						requests: [ { addSheet: { properties: { title: 'nodes' } } } ]
					})
						.then(() => this._insertRootNode(spreadsheetId))
			})
			.then(() => {
				this.$.dbFileId = spreadsheetId
			})
	}
}
