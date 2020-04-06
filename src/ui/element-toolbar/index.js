require('./style.sass')

const React = require('react')
const ButtonGroup = require('local/ui/button-group')


const ElementToolbar = ({
	actions,
	element
}) =>
	<div className="element-toolbar">
		<ButtonGroup vertical>
			<button onClick={() => element.remove()}>X</button>

			{actions.map(({ action, label }, i) =>
				<button
					key={i}
					onClick={() => action(element)}
				>
					{label}
				</button>
			)}
		</ButtonGroup>
	</div>

module.exports = ElementToolbar
