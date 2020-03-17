const React = require('react')

const { useEffect } = React


const SignOut = ({ signOut }) => {
	useEffect(() => { signOut() }, [])

	return 'LOADING...'
}

module.exports = SignOut
