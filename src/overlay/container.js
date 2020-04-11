require('./style.sass')

const { createPortal } = require('react-dom')
const { bem } = require('local/lib')

const Dialog = require('./dialog')
const Messages = require('./messages')

const { createElement, useEffect, useRef, useState } = React


module.exports = Context => ({
	children
}) => {
	const ref = useRef()
	const [ contextValue, setContextValue ] = useState(null)
	const [ dialogs, setDialogs ] = useState([])
	const [ messages, setMessages ] = useState([])

	useEffect(() => {
		ref.current = {
			provider: Context.Provider,
			anchor: document.createElement('div'),
			id () {
				return this.id.value
					? ++this.id.value
					: this.id.value = 1
			}
		}

		ref.current.anchor.className = bem('overlay')
		document.body.appendChild(ref.current.anchor)

		setContextValue({
			dialog: spec => setDialogs(ds => ds.concat({
				...spec,
				_toplevel: true,
				_onClose: () => setDialogs(ds => ds.slice(1))
			}))
			,
			message: spec => setMessages(ms => {
				const id = ref.current.id()

				return ms.concat({
					...spec,
					id,
					_onClose: () =>
						setMessages(ms => ms.filter(m => m.id !== id))
				})
			})
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
			createPortal([
				dialogs[0] && createElement(Dialog, {
					key: 'dialog',
					...dialogs[0]
				}),
				messages.length
					? createElement(Messages, {
						key: 'messages',
						messages
					})
					: null
			],
				ref.current.anchor
			)
		)
		: null
}
