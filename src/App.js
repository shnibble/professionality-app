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
