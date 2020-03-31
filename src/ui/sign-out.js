const React = require('react')

const { useEffect, useState } = React


const SignOut = ({ signOut, redirect }) => {
	const [ done, setDone ] = useState(false)

	useEffect(() => {
		signOut().then(() => setDone(true))
	}, [])

	return done ?
		redirect()
	:
		'Loading...'
}

module.exports = SignOut
