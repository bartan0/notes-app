const React = require('react')
const { Redirect, Route, Switch, useLocation } = require('react-router')
const SignIn = require('local/ui/sign-in')
const SignOut = require('local/ui/sign-out')
const RootNode = require('local/node')
const RootConsumer = require('local/consumers/root')

const { useState } = React


const APP_LOCATIONS = [
	'/notes',
	'/note/:id'
]
const LOCATION_DEFAULT = '/notes'


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

			{ready && <Route exact path={APP_LOCATIONS} render={() =>
				<RootNode consumer={RootConsumer}/>
			}/>}

			<Route exact path="/sign-out" render={() =>
				<SignOut signOut={signOut} redirect={() =>
					<Redirect to="/"/>
				}/>
			}/>
			{!ready && <Route path="/" render={() =>
				<SignIn forceLoading={signedIn} signIn={signIn}/>
			}/>}

			<Redirect to={LOCATION_DEFAULT}/>
		</Switch>
	)
}

module.exports = Router
