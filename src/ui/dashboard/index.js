require('./style.sass')

const Icon = require('local/ui/icon')
const { withSignoutButton } = require('local/ui/signout-button')
const { Link } = require('react-router-dom')
const { NodeStatus, useGService } = require('local/gservice')
const { bem } = require('local/lib')

const Item = require('./item')
const ActionButton = require('./action-button')


const C = 'dashboard'


const Dashboard = withSignoutButton(() => {
	const [ items, itemsStatus, root, rootStatus ] = useGService('/');

	return (
		<main>
			<div className={`${C}`}>
				<div className={`${C}__header`}>
					<h2>Notes</h2>

					<div>
						<ActionButton
							title="Add Note"
							icon="plus"
							onClick={() => root.append('NOTE')}
						/>
					</div>
				</div>

				{items ?
					<ul className={`${C}__notes-list`}>
						{items.map(item =>
							<Item
								key={item.id}
								item={item}
							/>
						)}
					</ul>
				:
					<div className={`${C}__loading`}>
						Loading...
					</div>
				}
			</div>
		</main>
	)
})

module.exports = Dashboard
