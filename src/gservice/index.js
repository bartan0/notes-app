window.GService = { $: {
	dbFileId: null
} }


require('./config')
require('./api')
require('./lib')
require('./item')


gapi.load('client:auth2', async () => {
	await gapi.client.init({
		clientId: GService.CLIENT_ID,
		discoveryDocs: GService.DISCOVERY_DOCS,
		scope: GService.AUTH_SCOPES.join(' ')
	})

	const auth = gapi.auth2.getAuthInstance()

	auth.isSignedIn.listen(GService._.onSignInStatusChange(auth.isSignedIn.get()))
})
