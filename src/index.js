require('local/global')
require('local/main.sass')
require('@fortawesome/fontawesome-free/css/all.css')

const Router = require('local/router')
const { BrowserRouter } = require('react-router-dom')
const { render } = require('react-dom')

const { createElement } = React


render(
	createElement(BrowserRouter, null,
		createElement(Router)
	),
	document.getElementById('app')
)
