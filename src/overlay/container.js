require('./style.sass')

const { createPortal } = require('react-dom')
const { bem } = require('local/lib')

const Dialog = require('./dialog')

const { createElement, useEffect, useRef, useState } = React


module.exports = Context => ({
	children
}) => {
	const ref = useRef()
	const [ contextValue, setContextValue ] = useState(null)
	const [ dialogs, setDialogs ] = useState([])

	useEffect(() => {
		ref.current = {
			provider: Context.Provider,
			anchor: document.createElement('div')
		}

		ref.current.anchor.className = bem('overlay')
		document.body.appendChild(ref.current.anchor)

		setContextValue({
			dialog: spec => setDialogs(ds => ds.concat({
				...spec,
				_onClose: () => setDialogs(ds => ds.slice(1))
			}))
		})

		return () => {
			document.body.removeChild(ref.current.anchor)
		}
	}, [])

	return contextValue
		? createElement(ref.current.provider, {
			value: contextValue
		},
			children,
			createPortal(
				dialogs[0] && createElement(Dialog, dialogs[0]),
				ref.current.anchor
			)
		)
		: null
}
