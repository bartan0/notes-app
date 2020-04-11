const { xbem } = require('local/lib')

const Dialog = require('./dialog')


const Messages = ({
	messages
}) =>
	<div { ...xbem('messages') }>
		{messages.map(spec =>
			<div
				key={spec.id}
				{ ...xbem('messages', 'message-container') }
			>
				<Dialog { ...spec }/>
			</div>
		)}
	</div>

module.exports = Messages
