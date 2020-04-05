require('./style.sass')

const React = require('react')
const { bem } = require('local/lib')

const { useEffect, useRef, useState } = React


const DynamicLabel = ({
	content,
	onUpdate
}) => {
	const inputRef = useRef()
	const [ isEdit, setIsEdit ] = useState(false)

	useEffect(() => {
		if (isEdit) {
			inputRef.current.focus()
			inputRef.current.setSelectionRange(0, content.length)
		}
	}, [
		isEdit
	])

	return (
		<div className={bem('dynamic-label')}>
			{isEdit ?
				<input
					ref={inputRef}
					className={bem('dynamic-label', 'input')}
					defaultValue={content}
					onBlur={({ target: t }) => {
						setIsEdit(false)
						onUpdate(t.value)
					}}
					onKeyDown={({ key }) => {
						if (key === 'Enter')
							inputRef.current.blur()
					}}
				/>
			:
				<div
					tabIndex="0"
					className={bem('dynamic-label', 'display')}
					onFocus={() => {
						setIsEdit(true)
					}}
				>
					{content}
				</div>
			}
		</div>
	)
}

module.exports = DynamicLabel
