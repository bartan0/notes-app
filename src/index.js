require('local/index.html')

const React = require('react')
const { render } = require('react-dom')
const GContainer = require('local/gcontainer')
const RootNode = require('local/node')
const Consumer = require('local/consumers/root')


const MainView = () =>
	<RootNode consumer={Consumer}/>


const App = () =>
	<GContainer
		autoConnect
		signedIn={() => <div>wait...</div>}
		signedOut={({ signIn }) =>
			<div><button onClick={() => signIn()}>SIGN IN</button></div>
		}
		ready={MainView}
	/>


render(
	React.createElement(App),
	document.getElementById('app')
)
