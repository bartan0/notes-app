const Icon = require('local/ui/icon')
const ButtonGroup = require('local/ui/button-group')
const { Link } = require('react-router-dom')
const { bem, userConfirm } = require('local/lib')
const { withMouseHover } = require('local/lib/react')

const { createElement, useState } = React

const maybeLink = (condition, to, element) => condition ?
	<Link to={to}>{element}</Link>
:
	element


const Item = withMouseHover({
	className: bem('dashboard', 'item')
})(({
	mouseHover,

	item,
	target
}) => {
	const [ isEdit, setEdit ] = useState(false)

	return [
		maybeLink(!isEdit, target,
			<div className={bem('dashboard', 'item-name')}>
				{isEdit ?
					// TODO: display "edit name" modal
					item.name
				:
					item.name
				}
			</div>
		),
		mouseHover &&
			<div className={bem('dashboard', 'item-controls')}>
				<ButtonGroup actions={[
					{
						icon: 'edit',
						title: 'Edit Name',
						action: () => setEdit(true)
					},
					{
						icon: 'trash-alt',
						title: 'Remove Item',
						action: () => userConfirm(
							'Do you really want to remove this item?',
							() => item.remove()
						)
					}
				]}/>
			</div>
	]
})

module.exports = Item
