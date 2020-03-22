const React = require('react')
const { Loader } = require('semantic-ui-react')

const { useEffect, useState } = React


const SignOut = ({ signOut, redirect }) => {
	const [ done, setDone ] = useState(false)

	useEffect(() => {
		signOut().then(() => setDone(true))
	}, [])

	return done ?
		redirect()
	:
		<Loader active/>
}

module.exports = SignOut
