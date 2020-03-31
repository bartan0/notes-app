require('local/main.sass')

const React = require('react')
const GServiceContainer = require('local/containers/gservice')
const Router = require('local/router')
const transformers = require('local/transformers')
const { render } = require('react-dom')
const { BrowserRouter } = require('react-router-dom')


const App = () =>
	<GServiceContainer
		autoConnect
		transformers={transformers}
		render={gcontainer =>
			<BrowserRouter>
				<Router {...gcontainer}/>
			</BrowserRouter>
		}
	/>

render(
	React.createElement(App),
	document.getElementById('app')
)
