require('./dimmer.sass')

const { xbem } = require('local/lib')


const Dimmer = ({
	loader
}) =>
	<div { ...xbem('dimmer') }>
		{loader &&
			<div { ...xbem('dimmer', 'loader') }/>
		}
	</div>

module.exports = Dimmer
