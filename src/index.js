require('local/global')
require('local/main.sass')
require('@fortawesome/fontawesome-free/css/all.css')

const { render } = require('react-dom')
const { Status, withGService } = require('local/gservice')
const { BrowserRouter, Redirect, Route, Switch, useLocation } = require('react-router-dom')
const Dashboard = require('local/ui/dashboard')
const Note = require('local/ui/note')
const SignIn = require('local/ui/sign-in')
const SignOut = require('local/ui/sign-out')

const { createElement, useEffect, useState } = React


const App = withGService(({
	status,
	connect,
	signIn,
	signOut
}) => {
	const location = useLocation()
	const [ targetLocation, setTargetLocation ] = useState(location)

	useEffect(() => {
		if (status === Status.SIGNED_IN)
			connect()

		if (status === Status.CONNECTED)
			setTargetLocation(null)

		/* DEV ONLY */
		if (status === Status.INIT)
			signIn()
	}, [
		status
	])

	return [
		status !== Status.CONNECTED &&
			<Switch key="not-connected">
				<Route exact path="/sign-in" render={() =>
					<SignIn onSignIn={signIn}/>
				}/>
				<Route exact path="/sign-out" render={() =>
					<SignOut onSignOut={signOut}/>
				}/>

				<Redirect to="/sign-in"/>
			</Switch>
		,
		status === Status.CONNECTED && targetLocation &&
			<Redirect key="target-redirect" to={targetLocation}/>
		,
		!targetLocation &&
			<Switch key="connected">
				<Route exact path="/" render={() =>
					<Dashboard/>
				}/>
				<Route exact path="/notes" render={() =>
					<Dashboard onlyNotes/>
				}/>
				<Route exact path="/note/:id" render={({ match: { params } }) =>
					<Note nodePath={`/${params.id}`}/>
				}/>
				<Route exact path="/sign-out" render={() =>
					<SignOut/>
				}/>

				<Redirect to="/"/>
			</Switch>
	]
})


render(
	createElement(BrowserRouter, null,
		createElement(App)
	),
	document.getElementById('app')
)
