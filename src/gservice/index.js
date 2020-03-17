const gapi = require('./gapi')

const GService = {
	CLIENT_ID: '217212189873-d4qlcpnbdhlt0h8t18c4k5d39hs3amco.apps.googleusercontent.com',
	DISCOVERY_DOCS: [,
		'https://people.googleapis.com/$discovery/rest?version=v1',
		'https://sheets.googleapis.com/$discovery/rest?version=v4',
		'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
	],
	AUTH_SCOPES: [ 'profile', 'email', 'https://www.googleapis.com/auth/drive' ],
	DB_FILENAME: '_database-test',
	ROOT_NODE_ID: '_ROOT',
	ROOT_NODE_PID: '_NONE',
	ROOT_NODE_TYPE: '_ROOT',
	FUNCTION_GET_CHILDINDEXES:
		'=JOIN(",",INDEX(SORT(FILTER({ROW(E:E),E:E},B:B=INDEX(A:A,ROW())),2,1),0,1))',

	$: {
		dbFileId: null,
		listeners: {
			init: [],
			signIn: [],
			signOut: []
		}
	},

	...require('./lib'),
	...require('./api')
}

GService._init()
module.exports = GService
