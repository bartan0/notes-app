require('./style.sass')

const { createPortal } = require('react-dom')
const { bem } = require('local/lib')

const Dialog = require('./dialog')
const Messages = require('./messages')
const Dimmer = require('./dimmer')

const { createElement, useEffect, useRef, useState } = React


const createAnchors = () => ({
	dialog: Dialog.createAnchor()
})

const deleteAnchors = () => {
	Dialog.deleteAnchor()
}


module.exports = Context => ({
	children
}) => {
	const ref = useRef()
	const [ contextValue, setContextValue ] = useState(null)
	const [ dialogs, setDialogs ] = useState([])
	const [ messages, setMessages ] = useState([])
	const [ dimmer, setDimmer ] = useState(null)

	const showDimmer = dimmer || (dialogs[0] || {}).dimmer


	useEffect(() => {
		ref.current = {
			provider: Context.Provider,
			anchors: createAnchors(),
			id () {
				return this.id.value
					? ++this.id.value
					: this.id.value = 1
			}
		}

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
			,
			showDimmer: loader => setDimmer({ loader })
			,
			hideDimmer: () => setDimmer(null)
		})

		return deleteAnchors
	}, [])


	return contextValue ?
		<ref.current.provider value={contextValue}>
			{children}
			{dialogs[0] && createPortal(
				<Dialog.Component { ...dialogs[0] }/>,
				ref.current.anchors.dialog
			)}
		</ref.current.provider>
	:
		null


	return contextValue
		? createElement(ref.current.provider, {
			value: contextValue
		},
			children,
			/*
			createPortal([
				showDimmer && createElement(Dimmer, {
					key: 'dimmer',
					...dimmer
				})
				,
				dialogs[0] && createElement(Dialog, {
					key: 'dialog',
					...dialogs[0]
				})
				,
				messages.length
					? createElement(Messages, {
						key: 'messages',
						messages
					})
					: null
			],
				ref.current.anchor
			)
			*/
		)
		: null
}
