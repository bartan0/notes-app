require('./style.sass')

const Icon = require('local/ui/icon')
const { NodeStatus, useGService } = require('local/gservice')
const { bem } = require('local/lib')

const Item = require('./item')


const Dashboard = () => {
	const [ items, itemsStatus, root, rootStatus ] = useGService('/')

	return (
		<div className={bem('dashboard')}>
			{itemsStatus === NodeStatus.OK ? items
				.map(item =>
					<Item
						key={item.id}
						className={bem('dashboard', 'item')}
						item={item}
						target={`/note/${item.id}`}
					/>
				)
				.concat(
					<button
						key="_add"
						title="Add Item"
						className={bem('dashboard', 'item', 'action')}
						onClick={() => root.append('NOTE')}
					>
						<Icon name="plus"/>
					</button>
				)
			:
				'Loading...'
			}
		</div>
	)
}

module.exports = Dashboard
