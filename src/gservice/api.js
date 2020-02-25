GService.signIn = () => gapi.auth2.getAuthInstance().signIn()
GService.signOut = () => gapi.auth2.getAuthInstance().signOut()

GService.connect = () => new Promise((resolve, reject) => {
	if (!gapi.auth2.getAuthInstance().isSignedIn.get())
		return reject('signed-out')

	resolve(gapi.client.drive.files.list({
		q: `name = "${GService.DB_FILENAME}" and trashed = false`
	})
		.then(({ result: { files: [ dbFile ] } }) => dbFile
			? GService._.initDBFile(dbFile.id)
			: GService._.createDBFile()
		)
	)
})


GService.on = (event, cb) => {
	const listeners = GService.$.listeners[event]

	if (listeners)
		listeners.push(cb)
}


GService.addNode = (id, pid, type, data) => GService._.ifConnected(() =>
	gapi.client.sheets.spreadsheets.values.append({
		spreadsheetId: GService.$.dbFileId,
		range: 'nodes!A:A',
		valueInputOption: 'USER_ENTERED',
		insertDataOption: 'INSERT_ROWS',
	}, {
		values: [ [ id, pid, '=JOIN(",",FILTER(ROW(A:A),B:B=INDEX(A:A,ROW())))', type, ...data ] ]
	})
)


GService.addNodeRoot = (id, type, data) =>
	GService.addNode(id, GService.ROOT_NODE_ID, type, data)


GService.getNodes = (indexes, full) => GService._.ifConnected(() =>
	gapi.client.sheets.spreadsheets.values.batchGet({
		spreadsheetId: GService.$.dbFileId,
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
)


GService.addNodeIndex = (parentIndex, id, pid, type, data) => GService.addNode(id, pid, type, data)
	.then(() => GService.getNodes([ parentIndex ]))
	.then(([ parent ]) => GService.getNodes(parent.childIndexes))
	.then(nodes => nodes.find(node => node.id === id).index)


GService.addNodeRootIndex = (id, type, data) =>
	GService.addNodeIndex(1, id, GService.ROOT_NODE_ID, type, data)


GService.updateNode = (index, pid, data) => GService._.ifConnected(() => Promise.all([
	pid && gapi.client.sheets.spreadsheets.values.update({
		spreadsheetId: GService.$.dbFileId,
		range: `nodes!B${index}`,
		valueInputOption: 'USER_ENTERED'
	}, {
		values: [ [ pid ] ]
	}),
	data && gapi.client.sheets.spreadsheets.values.update({
		spreadsheetId: GService.$.dbFileId,
		range: `nodes!E${index}`,
		valueInputOption: 'USER_ENTERED'
	}, {
		values: [ data ]
	})
]))


/*
 * The methods below does not seem to be needed anymore - to be removed at some point
 */

GService.addRow = (table, row) => new Promise((resolve, reject) => {
	if (!GService.$.dbFileId)
		return reject('not-connected')

	gapi.client.sheets.spreadsheets.values.append({
		spreadsheetId: GService.$.dbFileId,
		range: table,
		valueInputOption: 'RAW',
		insertDataOption: 'INSERT_ROWS',
		includeValuesInResponse: true
	}, {
		values: [ row ]
	})
		.then(({ result: { updates: { updatedData: { range } } } }) => (console.log('RANGE', range),
			resolve(GService._.a1parse(range).lastRow + 1)
		))
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
