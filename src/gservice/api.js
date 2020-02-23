GService.signIn = () => gapi.auth2.getAuthInstance().signIn()
	.then(() => true)
	.catch(err => (console.error('signIn', err), false))


GService.signOut = () => gapi.auth2.getAuthInstance().signOut()
	.then(() => true)
	.catch(err => (console.error('signOut'), false))


GService.connect = () => {
	if (!gapi.auth2.getAuthInstance().isSignedIn.get())
		return false

	return gapi.client.drive.files.list({
		q: `name = "${GService.DB_FILENAME}" and trashed = false`
	})
		.then(async ({ result: { files: [ dbFile ] } }) => {
			if (dbFile)
				await GService._.initDBFile(dbFile.id)
			else
				await GService._.createDBFile()

			return true
		})
		.catch(err => (console.error('connect', err), false))
}


GService.addRow = (table, row) => new Promise((resolve, reject) => {
	if (!GService.$.dbFileId)
		return reject('not-connected')

	gapi.client.sheets.spreadsheets.values.append({
		spreadsheetId: GService.$.dbFileId,
		range: table,
		valueInputOption: 'RAW'
	}, {
		values: [ row ]
	})
		.then(({ result: { tableRange } }) =>
			resolve(GService._.a1parse(tableRange).lastRow + 1)
		)
		.catch(reject)
})


GService.getAll = table => new Promise((resolve, reject) => {
	if (!GService.$.dbFileId)
		return reject('not-connected')

	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: GService.$.dbFileId,
		range: table
	})
		.then(({ result: { values } }) => resolve(values))
		.catch(reject)
})


GService.getRow = (table, index) => new Promise((resolve, reject) => {
	if (!GService.$.dbFileId)
		return reject('not-connected')

	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: GService.$.dbFileId,
		range: `${table}!${index}:${index}`
	})
		.then(({ result: { values: [ row ] } }) => resolve(row))
		.catch(reject)
})


GService.updateRow = (table, index, row) => new Promise((resolve, reject) => {
	if (!GService.$.dbFileId)
		return reject('not-connected')

	gapi.client.sheets.spreadsheets.values.update({
		spreadsheetId: GService.$.dbFileId,
		range: `${table}!${index}:${index}`,
		valueInputOption: 'RAW'
	}, {
		values: [ row ]
	})
		.then(resolve)
		.catch(reject)
})
