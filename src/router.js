const React = require('react')
const { Redirect, Route, Switch, useLocation } = require('react-router')
const SignIn = require('local/ui/sign-in')
const SignOut = require('local/ui/sign-out')
const Dashboard = require('local/ui/dashboard')
const NoteView = require('local/ui/note')

const { useState } = React


const Router = ({
	signedIn,
	ready,
	signIn,
	signOut
}) => {
	const location = useLocation()
	const [ originalLocation ] = useState(location)

	return (
		<Switch>
			{/*ready && location !== originalLocation &&
				APP_LOCATIONS.find(([ path ]) => path === originalLocation.pathname) &&
					<Redirect to={originalLocation}/>
			*/}

			{ready && [
				<Route exact key={1} path="/" render={() =>
					<Dashboard/>
				}/>,
				<Route exact key={2} path="/note/:id" render={({ match: { params } }) =>
					<NoteView nodePath={`/${params.id}`}/>
				}/>
			]}

			<Route exact path="/sign-out" render={() =>
				<SignOut signOut={signOut} redirect={() =>
					<Redirect to="/"/>
				}/>
			}/>
			{!ready && <Route path="/" render={() =>
				<SignIn forceLoading={signedIn} signIn={signIn}/>
			}/>}

			<Redirect to="/"/>
		</Switch>
	)
}

module.exports = Router
