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

const useDialog = () => {
	return useContext(Context)
}


const DialogContainer = ({
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
		value: {
			dialog: dialogProps => setQueue(q => q.concat(dialogProps))
		}
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


module.exports = {
	DialogContainer,
	useDialog
}
