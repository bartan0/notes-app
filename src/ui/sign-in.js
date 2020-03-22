const React = require('react')
const {
	Button,
	Divider,
	Image,
	Loader,
	Segment
} = require('semantic-ui-react')
const ToplevelBox = require('local/ui/toplevel-box')

const { useState } = React


const SignIn = ({ forceLoading, signIn }) => {
	const [ loading, setLoading ] = useState(false)
	const showLoading = loading || forceLoading

	return (
		<ToplevelBox>
			<Segment compact raised
				textAlign="center"
			>
				<Image centered
					size="large"
					src="https://via.placeholder.com/800x600?text=LOGO"
				/>
				<Divider/>
				{showLoading ?
					<Loader active inline/>
				:
					<Button
						icon="google"
						content="Sign In with Google"
						size="huge"
						onClick={() => {
							setLoading(true)
							signIn()
						}}
					/>
				}
			</Segment>
		</ToplevelBox>
	)
}

module.exports = SignIn
