const {
	createContext,
	createElement,
	useContext,
	useEffect,
	useRef,
	useState
} = require('react')
const { createPortal } = require('react-dom')

const Context = createContext()

const DialogProvider = ({
	component,
	children
}) => {
	const anchorRef = useRef()
	const [ queue, setQueue ] = useState([])

	useEffect(() => {
		document.body.appendChild(
			anchorRef.current = document.createElement('div')
		)

		return () => document.body.removeChild(anchorRef.current)
	}, [])

	return createElement(Context.Provider, {
		value: setQueue
	},
		children,
		queue.length
			? createPortal(
				createElement(component, {
					...queue[0],
					onClose: () => setQueue(q => q.slice(1))
				}),
				anchorRef.current
			)
			: null
	)
}


const useDialog = () => {
	const setQueue = useContext(Context)

	return props => setQueue(q => q.concat(props))
}


module.exports = {
	DialogProvider,
	useDialog
}
