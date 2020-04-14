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


const useSidebar = id => {
	const setSidebars = useContext(Context)

	return props => setSidebars(sbs =>
		sbs.map(sb => sb.id === id
			? { id, props: {
				...props,
				onClose: () => setSidebars(sbs => sbs.map(sb => sb.id === id
					? { id, props: null }
					: sb
				))
			} }
			: sb)
	)
}


const SidebarsProvider = ({
	children,
	components
}) => {
	const anchorRef = useRef()
	const [ sidebars, setSidebars ] = useState(() =>
		Object.entries(components)
			.map(([ id, component ]) => ({ id, props: null }))
	)

	useEffect(() => {
		document.body.appendChild(
			anchorRef.current = document.createElement('div')
		)

		return () => document.body.removeChild(anchorRef.current)
	}, [])

	return createElement(Context.Provider, {
		value: setSidebars
	},
		children,
		anchorRef.current && createPortal(
			sidebars.map(({ id, props }) => props && createElement(
				components[id],
				{ ...props, key: id }
			)),
			anchorRef.current
		)
	)
}

module.exports = {
	useSidebar,
	SidebarsProvider
}
