const React = require('react')
const Icon = require('local/ui/icon')

require('./action-button.sass')

const C = 'action-button'


const ActionButton = ({
	icon,
	...props
}) =>
	<button className={C} { ...props }>
		<Icon className={C + '__icon'} name={icon}/>
	</button>

module.exports = ActionButton
