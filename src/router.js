const React = require('react')
const { Redirect, Route, Switch, useLocation } = require('react-router')
const SignIn = require('local/ui/sign-in')
const SignOut = require('local/ui/sign-out')

const { useState } = React

/* TEMP */
const NotesView = () => <div>ALL NOTES</div>

const SingleNoteView = ({ match: { params } }) =>
	<div>Single Note #{params.id}</div>
/* ==== */

const APP_LOCATIONS = [
	[ '/notes', NotesView ],
	[ '/note/:id', SingleNoteView ]
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
			{ready && location !== originalLocation &&
				APP_LOCATIONS.find(([ path ]) => path === originalLocation.pathname) &&
					<Redirect to={originalLocation}/>
			}

			{ready && APP_LOCATIONS.map(([ path, component ]) =>
				<Route key={path} exact {...{ path, component }}/>
			)}

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
