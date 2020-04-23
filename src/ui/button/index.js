require('./button.sass')

const classNames = require('classnames')


const Button = ({
	className,
	children,
	...props
}) =>
	<button
		className={classNames(
			className,
			"button"
		)}
		{ ...props }
	>
		{children}
	</button>

module.exports = Button
