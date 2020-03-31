const React = require('react')
const ToplevelBox = require('local/ui/toplevel-box')

const { useState } = React


const SignIn = ({ forceLoading, signIn }) => {
	const [ loading, setLoading ] = useState(false)
	const showLoading = loading || forceLoading

	return (
		<ToplevelBox>
			<div>
				<div style={{
					backgroundImage: 'url(https://via.placeholder.com/800x600?text=LOGO)'
				}}/>

				<div>
					{showLoading ?
						'Loading...'
					:
						<button onClick={() => {
							setLoading(true)
							signIn()
						}}>
							Sign in with Google
						</button>
					}
				</div>
			</div>
		</ToplevelBox>
	)
}

module.exports = SignIn
