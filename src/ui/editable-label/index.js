require('./style.sass')

const React = require('react')
const FocusContainer = require('local/ui/focus')
const Icon = require('local/ui/icon')
const classNames = require('classnames')
const { bem } = require('local/lib')

const { useRef, useState } = React

const ACTION_BUTTON_WIDTH = 2


const ActionButton = ({
	action,
	title,
	icon,
	brand,
	label
}) =>
	<button
		className={bem('editable-label', 'button')}
		style={{ width: `${ACTION_BUTTON_WIDTH}em` }}
		title={title}
		onClick={action}
	>
		{icon ?
			<Icon brand={brand} name={icon}/>
		:
			label
		}
	</button>


const EditableLabel = ({
	actionsLeft,
	actionsRight,
	value,
	onUpdate
}) => {
	const inputRef = useRef()
	const [ isEdit, setEdit ] = useState(false)

	const onKey = ({ key }) => {
		if (key === 'Enter')
			inputRef.current.blur()
	}

	return (
		<FocusContainer passFocus
			className={bem('editable-label')}
			onBlur={() => {
				setEdit(false)
				onUpdate(inputRef.current.value)
			}}
		>
			{isEdit && (actionsLeft || []).map((action, i) =>
				<ActionButton key={2 * i} { ...action }/>
			)}

			<input
				ref={inputRef}
				className={classNames(bem('editable-label', 'input'), { display: !isEdit })}
				style={isEdit
					? {
						marginLeft: `-${(actionsLeft || []).length * ACTION_BUTTON_WIDTH}em`,
						marginRight: `-${(actionsRight || []).length * ACTION_BUTTON_WIDTH}em`,
						paddingLeft: `${(actionsLeft || []).length * ACTION_BUTTON_WIDTH}em`,
						paddingRight: `${(actionsRight || []).length * ACTION_BUTTON_WIDTH}em`
					}
					: {}
				}
				type="text"
				defaultValue={value}
				onKeyDown={onKey}
				onFocus={() => {
					setEdit(true)
					inputRef.current.setSelectionRange(0, value.length)
				}}
			/>

			{isEdit && (actionsRight || []).map((action, i) =>
				<ActionButton key={2 * i + 1} { ...action }/>
			)}
		</FocusContainer>
	)
}

module.exports = EditableLabel
