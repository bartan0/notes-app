require('local/global')
require('local/main.sass')
require('@fortawesome/fontawesome-free/css/all.css')

const { render } = require('react-dom')
const { BrowserRouter } = require('react-router-dom')
const Router = require('local/router')


render(
	<BrowserRouter>
		<Router/>
	</BrowserRouter>
	,
	document.body.appendChild(
		document.createElement('div')
	)
)
