require('semantic-ui-css/semantic.min.css')
require('local/main.sass')

const React = require('react')
const GContainer = require('local/gcontainer')
const Router = require('local/router')
const { render } = require('react-dom')
const { BrowserRouter, Link, Switch, Route } = require('react-router-dom')


const App = () =>
	<GContainer
		autoConnect
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
