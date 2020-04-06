const React = require('react')

const { useRef } = React


const FocusContainer = ({
	children,
	onFocus,
	onBlur
}) => {
	const ref = useRef()
	const maybeOnBlur = ({ relatedTarget }) => {
		if (!ref.current.contains(relatedTarget))
			onBlur()
	}

	return (
		<div
			ref={ref}
			tabIndex="0"
			onFocus={onFocus}
			onBlur={maybeOnBlur}
		>
			{children}
		</div>
	)
}

module.exports = FocusContainer
