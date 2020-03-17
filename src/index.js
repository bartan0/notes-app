require('local/index.html')

const React = require('react')
const GContainer = require('local/gcontainer')
const Router = require('local/router')
const { render } = require('react-dom')
const { BrowserRouter } = require('react-router-dom')


/*
const App = () =>
	<GContainer autoConnect
		signedIn={() => <div>wait...</div>}

		signedOut={({ signIn }) =>
			<div><button onClick={() => signIn()}>SIGN IN</button></div>
		}

		ready={() =>
		}

		ready={() =>
			<RootNode consumer={({
				nodes,
				append,
				loadNodes
			}) =>
				<Router>
					<Switch>
						<Route exact path="/notes" render={() =>
							<NotesView notes={nodes}/>
						}/>

						<Route exact path="/note/:slug" render={({
							match: { params: { slug } }
						}) =>
							<NoteView slug={slug}/>
						}/>

						<Redirect to="/notes"/>
					</Switch>
				</Router>
			}/>
		}
	/>
*/


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
