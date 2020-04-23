const HBox = ({
	reversed,
	style,
	children,
	...props
}) =>
	<div style={{
		display: 'flex',
		flexDirection: reversed ? 'row-reverse' : 'row',
		...style
	}}
		{ ...props }
	>
		{children}
	</div>


const VBox = ({
	reversed,
	style,
	children,
	...props
}) =>
	<div style={{
		display: 'flex',
		flexDirection: reversed ? 'column-reverse' : 'column',
		...style
	}}
		{ ...props }
	>
		{children}
	</div>


module.exports = {
	HBox,
	VBox
}
