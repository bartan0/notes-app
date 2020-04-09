const ToplevelBox = require('local/ui/toplevel-box')

const { useState } = React


const SignIn = ({ loading, onSignIn }) => {
	const [ isLoading, setLoading ] = useState(!!loading)

	return (
		<ToplevelBox>
			<div>
				<div style={{
					backgroundImage: 'url(https://via.placeholder.com/800x600?text=LOGO)'
				}}/>

				<div>
					{isLoading ?
						'Loading...'
					:
						<button onClick={() => {
							setLoading(true)
							onSignIn()
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
