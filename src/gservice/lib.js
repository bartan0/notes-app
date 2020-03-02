const gapi = require('./gapi')

module.exports = {
	_emit (event, ...args) {
		this.$.listeners[event].forEach(f => f(...args))
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
				'=JOIN(",",FILTER(ROW(A:A),B:B=INDEX(A:A,ROW())))',
				this.ROOT_NODE_TYPE
			] ]
		})
			.then(() => spreadsheetId)
	},


	_createDBFile () {
		return gapi.client.sheets.spreadsheets.create({
			properties: { title: this.DB_FILENAME },
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
