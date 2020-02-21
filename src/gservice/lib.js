GService._ = {}

GService._.a1parse = (s, defaultSheet = null) => {
	const [ _, sheet, firstCol, firstRow, lastCol, lastRow ] =
		/(?:([-_\dA-Za-z]+)!)?([A-Z]*)(\d*)(?::([A-Z]*)(\d*))?/.exec(s || '') || []

	return {
		sheet: sheet || defaultSheet,
		firstRow: +(firstRow || 0),
		firstCol: firstCol || '',
		lastRow: +(lastRow || 0),
		lastCol: lastCol || ''
	}
}


GService._.createDBFile = () => gapi.client.sheets.spreadsheets.create({
	properties: { title: GService.DB_FILENAME },
	sheets: GService.DB_TABLES.map(name => ({ properties: { title: name } }))
})
	.then(({ result: { sheets, spreadsheetId } }) => {
		GService.$.dbFileId = spreadsheetId
	})
	.catch(err => (console.error('createDBFile', err), false))


GService._.initDBFile = fileId => gapi.client.sheets.spreadsheets.get({
	spreadsheetId: fileId
})
	.then(async ({ result: { sheets } }) => {
		const missingSheetNames = [ ...sheets
			.reduce(
				(s, { properties: { title } }) => (s.delete(title), s),
				new Set(GService.DB_TABLES)
			)
			.values()
		]

		if (missingSheetNames.length)
			try {
				await gapi.client.sheets.spreadsheets.batchUpdate({
					spreadsheetId: fileId,
					requests: missingSheetNames.map(name => ({ addSheet: { properties: { title: name } } }))
				})

			} catch (err) {
				console.error('initDBFile', err)
			}

		GService.$.dbFileId = fileId
	})
	.catch(err => (console.error('intiDBFile', err), false))


GService._.onSignInStatusChange = status => {
	if (status)
		console.log('SIGNED IN')
	else {
		console.log('SIGNED OUT')

		GService.$.dbFileId = null
	}

	return GService._.onSignInStatusChange
}
