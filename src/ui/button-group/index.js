require('./style.sass')

const { createElement } = require('react')
const classNames = require('classnames')
const { Link } = require('react-router-dom')
const { bem } = require('local/lib')
const Icon = require('local/ui/icon')


const ButtonGroup = ({
	actions,
	vertical,
	className
}) =>
	createElement('div', {
		className: classNames(bem('button-group'), {
			horizontal: !vertical,
			vertical: vertical
		},
			className
		)
	}, actions.map(({
		action,
		brand,
		icon,
		label,
		link,
		title
	}, key) => createElement(link ? Link : 'button', Object.assign({
		key,
		title,
		className: classNames(
			bem('button-group', 'button'),
			icon
				? bem('button-group', 'button', 'icon')
				: bem('button-group', 'button', 'label')
		)
	}, link ? {
		to: link
	} : {
		onClick: action
	}),
	icon ?
		createElement(Icon, { brand, name: icon })
	:
		label
	)))

module.exports = ButtonGroup
