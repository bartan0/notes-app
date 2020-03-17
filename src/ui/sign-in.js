const React = require('react')

const { useState } = React


const SignIn = ({ forceLoading, signIn }) => {
	const [ loading, setLoading ] = useState(false)

	if (loading || forceLoading)
		return 'LOADING...'

	return (
		<div>
			<button
				onClick={() => {
					setLoading(true)
					signIn()
				}}
			>
				BIG GOOGLE BUTTON
			</button>
		</div>
	)
}

module.exports = SignIn
