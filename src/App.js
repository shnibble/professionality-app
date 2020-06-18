import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './context/user'
import Header from './components/header/header'
import Main from './components/main'
import Login from './components/login'
import Nav from './components/nav'
import Account from './components/account'
import Calendar from './components/calendar'
import EPGP from './components/epgp'
import Roster from './components/roster/roster'
import Bank from './components/bank'
import Buffs from './components/buffs'
import Home from './components/home'
import Footer from './components/footer'

import './app.css'


function App() {
  return (
    <UserProvider>
        <Router>
            <Header />
            <Nav />
            <Main>
                <Switch>
                    <Route path={'/account'} component={Account} />
                    <Route path={'/calendar'} component={Calendar} />
                    <Route path={'/epgp'} component={EPGP} />
                    <Route path={'/roster'} component={Roster} />
                    <Route path={'/bank'} component={Bank} />
                    <Route path={'/buffs'} component={Buffs} />
                    <Route path={'/login'} component={Login} />
                    <Route path={'/'} component={Home} />
                </Switch>
            </Main>
            <Footer />
        </Router>
    </UserProvider>
  )
}

export default App
