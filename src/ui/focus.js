const { createElement, forwardRef, useRef } = require('react')

const FocusContainer = forwardRef(({
	passFocus,
	children,
	onFocus,
	onBlur,
	...props
},
	upRef
) => {
	const fallbackRef = useRef()
	const maybeOnBlur = ({ relatedTarget }) => {
		if (!ref.current.contains(relatedTarget))
			onBlur()
	}

	let ref = upRef || fallbackRef

	return createElement('div', {
		ref,
		tabIndex: 0,
		onFocus: passFocus
			? event => {
				const child = ref.current.children[0]

				if (
					(event.target === ref.current) &&
					(event.relatedTarget !== child) &&
					child
				)
					child.focus()

				if (onFocus)
					onFocus(event)
			}
			: onFocus,
		onBlur: maybeOnBlur,
		...props
	},
		children
	)
})

module.exports = FocusContainer
