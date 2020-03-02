module.exports = {
	CLIENT_ID: '217212189873-oh54f7sr263sjjsnegktkuo3hidjod4g.apps.googleusercontent.com',
	DISCOVERY_DOCS: [,
		'https://people.googleapis.com/$discovery/rest?version=v1',
		'https://sheets.googleapis.com/$discovery/rest?version=v4',
		'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
	],
	AUTH_SCOPES: [ 'profile', 'email', 'https://www.googleapis.com/auth/drive' ],
	DB_FILENAME: '_database-test',
	ROOT_NODE_ID: '_00000000000000000000000000000001',
	ROOT_NODE_PID: '_00000000000000000000000000000000',
	ROOT_NODE_TYPE: '_ROOT',

	$: {
		dbFileId: null,
		listeners: {
			signIn: [],
			signOut: []
		}
	},

	...require('./lib'),
	...require('./api')
}
