import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './context/user'
import Header from './components/header'
import Login from './components/login'


function App() {
  return (
    <UserProvider>
        <Header />
        <nav>
            <a href='/'>Home</a>
            <br />
            <a href="https://discord.com/api/oauth2/authorize?client_id=720699635076956210&redirect_uri=https%3A%2F%2Fprofessionality.app%2Flogin&response_type=code&scope=identify">
            Login with Discord
            </a>
        </nav>
        <Router>
            <Switch>
                <Route path={'/login'} component={Login} />
                <Route path={'/'}>
                    <h2>Home</h2>
                </Route>
            </Switch>
        </Router>
    </UserProvider>
  )
}

export default App
