import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
        <a href='/'>Home</a>
        <br />
        <a href="https://discord.com/api/oauth2/authorize?client_id=720699635076956210&redirect_uri=https%3A%2F%2Fprofessionality.app%2Flogin&response_type=code&scope=identify">
          Login with Discord
        </a>
        <Router>
            <Switch>
                <Route path={'/login'}>
                    <h1>Login</h1>
                </Route>

                <Route path={'/'}>
                    <h1>Home</h1>
                </Route>
            </Switch>
        </Router>
    </div>
  )
}

export default App
