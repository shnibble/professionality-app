import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './context/user'
import { ThemeProvider } from 'styled-components'
import lightTheme from './themes/light'
import darkTheme from './themes/dark'
import Wrapper from './components/wrapper'
import Menu from './components/menu/menu'
import Main from './components/main'
import Login from './components/login'
import Account from './components/account/account'
import Calendar from './components/calendar/calendar'
import EPGP from './components/epgp/epgp'
import Roster from './components/roster/roster'
import Bank from './components/bank/bank'
import Loot from './components/loot/loot'
import Rules from './components/rules'
import Strategies from './components/strategies/strategies'
import Assignments from './components/assignments/assignments'
import Home from './components/home'
import Event from './components/calendar/event'
import Footer from './components/footer'

import './app.css'
import 'react-datepicker/dist/react-datepicker.css'


const App = () => {

    const stored = localStorage.getItem('isDarkMode');
    const [isDarkMode, setIsDarkMode] = useState(
        stored === "false" ? false : true
    )
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        localStorage.setItem('isDarkMode', !isDarkMode)
    }

    const [menuOpen, setMenuOpen] = useState(
        window.innerWidth >= 720 ? true : false
    )
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <UserProvider>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme }>
                <Router>
                    <Wrapper menuOpen={menuOpen}>
                        <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} toggleTheme={toggleTheme} darkTheme={isDarkMode} />
                        <Main>
                            <Switch>
                                <Route path={'/account'} component={Account} />
                                <Route path={'/calendar'} component={Calendar} />
                                <Route path={'/epgp'} component={EPGP} />
                                <Route path={'/roster'} component={Roster} />
                                <Route path={'/bank'} component={Bank} />
                                <Route path={'/loot'} component={Loot} />
                                <Route path={'/rules'} component={Rules} />
                                <Route path={'/strategies'} component={Strategies} />
                                <Route path={'/assignments'} component={Assignments} />
                                <Route path={'/login'} component={Login} />
                                <Route path={'/event/:id'} component={Event} />
                                <Route path={'/'} component={Home} />
                            </Switch>
                        </Main>
                        <Footer />
                    </Wrapper>
                </Router>
            </ThemeProvider>
        </UserProvider>
    )
}

export default App
