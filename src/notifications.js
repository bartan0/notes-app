const {
	createContext,
	createElement,
	useContext,
	useRef,
	useState,
	useEffect
} = require('react')
const { createPortal } = require('react-dom')

const Context = createContext()

const Counter = {
	next () {
		return this.value
			? ++this.value
			: this.value = 1
	}
}


const NotificationsProvider = ({
	component,
	children
}) => {
	const anchorRef = useRef()
	const [ notifications, setNotifications ] = useState(null)

	useEffect(() => {
		document.body.appendChild(
			anchorRef.current = document.createElement('div')
		)
		setNotifications([])

		return () => document.body.removeChild(anchorRef.current)
	}, [])

	return createElement(Context.Provider, {
		value: setNotifications
	},
		children,
		anchorRef.current && createPortal(
			createElement(component, { notifications }),
			anchorRef.current
		)
	)
}


const useNotify = () => {
	const setNotifications = useContext(Context)

	return props => {
		const id = Counter.next()

		setNotifications(ns => ns.concat({
			...props,
			id,
			onClose: () => setNotifications(ns => ns.filter(n => n.id !== id))
		}))
	}
}

module.exports = {
	useNotify,
	NotificationsProvider
}
