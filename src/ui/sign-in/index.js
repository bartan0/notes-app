const Button = require('local/ui/button')
const Icon = require('local/ui/icon')
const ToplevelBox = require('local/ui/toplevel-box')

require('./style.sass')

const { useState } = React


const SignIn = ({ loading, onSignIn }) => {
	const [ isLoading, setLoading ] = useState(!!loading)

	return (
		<ToplevelBox>
			{isLoading ?
				<div>Loading...</div>
			:
				<div>
					<button
						className="sign-in-button"
						onClick={() => {
							setLoading(true)
							onSignIn()
						}}
					>
						<Icon brand name="google"/>
						<span className="sign-in-button__label">
							Sign in with Google
						</span>
					</button>
				</div>
			}
		</ToplevelBox>
	)
}

module.exports = SignIn
