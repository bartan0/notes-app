const React = require('react')
const { Redirect } = require('react-router')

const { useEffect, useState } = React


const SignOut = ({
	target,
	onSignOut
}) => {
	const [ done, setDone ] = useState(false)

	useEffect(() => {
		if (match)
			onSignOut().then(() => setDone(true))
	}, [])

	return done ?
		<Redirect to={target || '/'}/>
	:
		'Loading...'
}

module.exports = SignOut
