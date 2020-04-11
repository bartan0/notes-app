const { createContext, useContext } = React
const Context = createContext()

module.exports = {
	OverlayContainer: require('./container')(Context),
	useOverlay: () => useContext(Context)
}
