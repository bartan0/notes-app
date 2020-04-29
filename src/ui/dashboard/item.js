const Icon = require('local/ui/icon')
const ButtonGroup = require('local/ui/button-group')
const { Link } = require('react-router-dom')
const { bem, userConfirm } = require('local/lib')
const { withMouseHover } = require('local/lib/react')

const { useState } = React


const Item = withMouseHover(({
	mouseHover,

	item,
	target
}) => {
	const [ isEdit, setEdit ] = useState(false)

	return [
		// TODO: editing name (modal)
		<Link key="name" to={target}>
			<div className={bem('dashboard', 'item-name')}>
				{item.name}
			</div>
		</Link>
		,
		mouseHover &&
			<div key="buttons" className={bem('dashboard', 'item-controls')}>
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
