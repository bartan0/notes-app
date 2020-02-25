GService._ = {}

GService._.emit = (event, ...args) => GService.$.listeners[event].forEach(f => f(...args))

GService._.ifConnected = action => new Promise((resolve, reject) => {
	if (!GService.$.dbFileId)
		return reject('not-connected')

	resolve(action())
})


GService._.onSignInStatusChange = status => {
	GService._.emit(status ? 'signIn' : 'signOut')

	return GService._.onSignInStatusChange
}


GService._.insertRootNode = spreadsheetId => gapi.client.sheets.spreadsheets.values.update({
	spreadsheetId,
	range: 'nodes!A1',
	valueInputOption: 'USER_ENTERED'
}, {
	values: [ [
		GService.ROOT_NODE_ID,
		GService.ROOT_NODE_PID,
		'=JOIN(",",FILTER(ROW(A:A),B:B=INDEX(A:A,ROW())))',
		GService.ROOT_NODE_TYPE
	] ]
})
	.then(() => spreadsheetId)


GService._.createDBFile = () => gapi.client.sheets.spreadsheets.create({
	properties: { title: GService.DB_FILENAME },
	sheets: [ { properties: { title: 'nodes' } } ]
})
	.then(({ result: { spreadsheetId: id } }) => GService._.insertRootNode(id))
	.then(id => {
		GService.$.dbFileId = id
	})


GService._.initDBFile = spreadsheetId => gapi.client.sheets.spreadsheets.get({ spreadsheetId })
	.then(({ result: { sheets } }) => {
		if (!sheets.find(({ properties: { title } }) => title === 'nodes'))
			return gapi.client.sheets.spreadsheets.batchUpdate({
				spreadsheetId,
				requests: [ { addSheet: { properties: { title: 'nodes' } } } ]
			})
				.then(() => GService._.insertRootNode(spreadsheetId))
	})
	.then(() => {
		GService.$.dbFileId = spreadsheetId
	})
