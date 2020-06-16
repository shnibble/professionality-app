import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { UserProvider } from './context/user'
import Header from './components/header'
import Login from './components/login'


function App() {
  return (
    <UserProvider>
        <Router>
            <Header />
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/test'>Test</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path={'/login'} component={Login} />
                <Route path={'/test'}>
                    <h2>Test</h2>
                </Route>
                <Route path={'/'}>
                    <h2>Home</h2>
                </Route>
            </Switch>
        </Router>
    </UserProvider>
  )
}

export default App
