const { Status, withGService } = require('local/gservice')
const { Redirect, Route, Switch, useLocation } = require('react-router-dom')

const Dashboard = require('local/ui/dashboard')
const Note = require('local/ui/note')
const SignIn = require('local/ui/sign-in')
const SignOut = require('local/ui/sign-out')

const { useEffect, useState } = React


const getTargetLocation = initialLocation => {
	if ([
		'/sign-in',
		'/sign-out'
	]
		.includes(initialLocation.pathname)
	)
		return null

	return initialLocation
}


const Router = withGService(({
	status,
	connect,
	signIn,
	signOut
}) => {
	const location = useLocation()
	const [ targetLocation, setTargetLocation ] = useState(() =>
		getTargetLocation(location)
	)

	useEffect(() => {
		if (status === Status.SIGNED_IN)
			connect()

		if (status === Status.CONNECTED)
			setTargetLocation(null)

		if (_ROUTER_AUTO_SIGN_IN)
			if (status === Status.INIT)
				signIn()
	}, [
		status
	])

	return [
		status === Status.ZERO &&
			<div key="loading">
				Loading...
			</div>
		,
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
		targetLocation &&
			<Redirect key="target-redirect" to={targetLocation}/>
		,
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
				<SignOut onSignOut={signOut}/>
			}/>

			<Redirect to="/"/>
		</Switch>
	]
		.filter(Boolean)[0]
})

module.exports = Router
