require('local/main.sass')

const React = require('react')
const { render } = require('react-dom')
const { Status, withGService } = require('local/gservice')
const transformers = require('local/transformers')
const { BrowserRouter, Redirect, Route, Switch } = require('react-router-dom')
const Dashboard = require('local/ui/dashboard')
const Note = require('local/ui/note')
const SignIn = require('local/ui/sign-in')
const SignOut = require('local/ui/sign-out')

const { createElement, useEffect } = React


const App = withGService(
	transformers
)(({
	status,
	connect,
	signIn,
	signOut
}) => {
	useEffect(() => {
		if (status === Status.SIGNED_IN)
			connect()
	}, [
		status
	])

	return (
		<BrowserRouter>
			{status !== Status.CONNECTED &&
				<Switch>
					<Route exact path="/sign-in" render={() =>
						<SignIn onSignIn={signIn}/>
					}/>
					<Route exact path="/sign-out" render={() =>
						<SignOut onSignOut={signOut}/>
					}/>

					<Redirect to="/sign-in"/>
				</Switch>
			}

			{status === Status.CONNECTED &&
				<Switch>
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
			}
		</BrowserRouter>
	)
})


render(
	createElement(App),
	document.getElementById('app')
)
