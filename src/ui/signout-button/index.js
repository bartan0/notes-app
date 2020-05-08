const React = require('react')
const GService = require('local/gservice')
const Icon = require('local/ui/icon')

require('./style.sass')


const SignoutButton = () =>
	<div className="signout-button">
		<button className="signout-button__button"
			onClick={() => GService.signOut()}
		>
			<Icon name="power-off"/>
		</button>
	</div>


const withSignoutButton = Component =>
	props => [
		<SignoutButton key={'signout'}/>
		,
		<Component key={'component'} { ...props }/>
	]


module.exports = Object.assign(SignoutButton, {
	withSignoutButton
})
