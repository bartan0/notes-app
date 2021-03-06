const GService = Object.assign({
	CLIENT_ID: _GAPI_CLIENT_ID,
	DISCOVERY_DOCS: [,
		'https://people.googleapis.com/$discovery/rest?version=v1',
		'https://sheets.googleapis.com/$discovery/rest?version=v4',
		'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
	],
	AUTH_SCOPES: [ 'profile', 'email', 'https://www.googleapis.com/auth/drive.file' ],
	DB_FILENAME: _GSERVICE_DB_FILENAME,
	DB_LOCALE: 'en_US',
	ROOT_NODE_ID: 'ROOT',
	ROOT_NODE_PID: 'NONE',
	ROOT_NODE_TYPE: 'ROOT',
	FUNCTIONS: {
		GET_CHILD_INDEXES:
			'=IFNA(JOIN(",", INDEX(SORT(FILTER({ ROW(A:A), D:D }, B:B = INDEX(A:A, ROW()), C:C = 0), 2, 1), 0, 1)), "")',
		GET_NODE_COUNTS:
			'=JOIN(",",{SUM(C:C), COUNT(C:C) - 1})',
		GET_REMOVED_INDEXES:
			'=IFNA(JOIN(",", SORTN(FILTER(ROW(A:A), C:C = 1), 5)), "")',
		NODE_IS_REMOVED:
			'=IFNA(INDIRECT("C" & MATCH(INDEX($B:$B, ROW()), $A:$A, 0)), 1)'
	},

	Status: {
		ZERO: 0,
		INIT: 1,
		SIGNED_IN: 2,
		CONNECTED: 3
	},

	NodeStatus: {
		OK: 1,
		PENDING: 2,
		ERROR: 3,
		NOT_FOUND: 4
	},

	$: {
		auth: null,
		dbFileId: null,
		listeners: {
			init: [],
			signIn: [],
			signOut: [],
			connect: []
		},
		transformers: {},
		nodeMethods: {}
	}
},
	require('./lib'),
	require('./api')
)

Object.assign(GService,
	require('./react')(GService)
)

GService._init()
module.exports = GService
