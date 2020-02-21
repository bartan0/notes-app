GService.CLIENT_ID = '217212189873-oh54f7sr263sjjsnegktkuo3hidjod4g.apps.googleusercontent.com'
GService.DISCOVERY_DOCS = [
	'https://people.googleapis.com/$discovery/rest?version=v1',
	'https://sheets.googleapis.com/$discovery/rest?version=v4',
	'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
]
GService.AUTH_SCOPES = [ 'profile', 'email', 'https://www.googleapis.com/auth/drive' ]
GService.DB_FILENAME = '__database-test'
GService.DB_TABLES = [
	'checklists',
	'checklistItems',
	'documents',
	'labels',
	'toggles'
]
