const React = require('react')

const { useEffect, useRef, useState } = React


const DynamicLabel = ({
	content,
	onUpdate
}) => {
	const inputRef = useRef()
	const [ isEdit, setIsEdit ] = useState(false)

	useEffect(() => {
		if (isEdit)
			inputRef.current.focus()
	}, [
		isEdit
	])

	return isEdit ?
		<input
			ref={inputRef}
			defaultValue={content}
			onBlur={({ target: t }) => {
				setIsEdit(false)
				onUpdate(t.value)
			}}
		/>
	:
		<span
			tabIndex="0"
			onFocus={() => {
				setIsEdit(true)
			}}
		>
			{content}
		</span>
}

module.exports = DynamicLabel
