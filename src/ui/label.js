const React = require('react')

const Label = ({
	value,
	onChange
}) =>
	<div>
		<input
			type="text"
			value={value || ''}
			onChange={({ target: t }) => onChange(t.value)}
		/>
	</div>

module.exports = Label
