const GService = require('local/gservice')
const { useEffect, useState } = require('react')

const Status = {
	SIGNED_OUT: 1,
	SIGNED_IN: 2,
	READY: 3
}


const GContainer = ({
	autoConnect,
	render
}) => {
	const [ status, setStatus ] = useState(Status.SIGNED_OUT)

	useEffect(() => {
		GService.on('signIn', () => setStatus(Status.SIGNED_IN))
		GService.on('signOut', () => setStatus(Status.SIGNED_OUT))
		GService.on('init', () => setStatus(Status.READY))

		if (autoConnect)
			GService.connect()
	}, [])

	return render({
		signedIn: [ Status.SIGNED_IN, Status.READY ].includes(status),
		ready: status === Status.READY,
		signIn: () => GService.connect().then(GService.signIn),
		signOut: () => GService.signOut()
	})
}

module.exports = GContainer
