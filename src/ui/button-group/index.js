require('./style.sass')

const React = require('react')
const classNames = require('classnames')
const { bem } = require('local/lib')


const ButtonGroup = ({
	buttons,
	children,

	vertical
}) =>
	<div className={classNames(bem('button-group'), {
		horizontal: !vertical,
		vertical: vertical
	})}>
		{buttons ?
			buttons.map(({
				action,
				key,
				label
			}) =>
				<button key={key} onClick={action}>{label}</button>
			)
		:
			children
		}
	</div>

module.exports = ButtonGroup
