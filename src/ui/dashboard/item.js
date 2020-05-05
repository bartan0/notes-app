const Icon = require('local/ui/icon')
const ButtonGroup = require('local/ui/button-group')
const ActionButton = require('./action-button')
const { Link } = require('react-router-dom')
const { bem, userConfirm } = require('local/lib')
const { withMouseHover } = require('local/lib/react')

const { useState } = React

require('./item.sass')

const C = 'dashboard-note'


const Item = withMouseHover(({
	mouseHover,
	item
}) => {
	return (
		<li className={C}>
			<Link className={C + '__label'} to={`/note/${item.id}`}>
				{item.name}
			</Link>

			{mouseHover &&
				<div>
					<ActionButton
						title="Move Up"
						icon="chevron-up"
						onClick={() => item.reorder(-1)}
					/>
					<ActionButton
						title="Move Down"
						icon="chevron-down"
						onClick={() => item.reorder(1)}
					/>
					<ActionButton
						title="Remove Note"
						icon="ban"
						onClick={() => item.remove()}
					/>
				</div>
			}
		</li>
	)
})

module.exports = Item
