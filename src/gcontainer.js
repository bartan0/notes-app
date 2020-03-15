const GService = require('local/gservice')
const { useEffect, useState } = require('react')


const GContainer = ({
	autoConnect,

	ready,
	signedIn,
	signedOut,
}) => {
	const [ isSignedIn, setSignedIn ] = useState(false)
	const [ isInitialized, setInitialized ] = useState(false)
	const render = isSignedIn
		? isInitialized
			? ready
			: signedIn
		: signedOut

	useEffect(() => {
		GService.on('signIn', () => setSignedIn(true))
		GService.on('signOut', () => {
			setSignedIn(false)
			setInitialized(false)
		})
		GService.on('init', () => setInitialized(true))

		if (autoConnect)
			GService.connect()
	}, [])

	return render({
		isSignedIn,
		signIn: () => GService.signIn(),
		signOut: () => GService.signOut()
	})
}

module.exports = GContainer
