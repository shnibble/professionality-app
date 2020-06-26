import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Events from './events'
import PastEvents from './pastEvents'

const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`
const Li = styled.li`
    margin: 5px;
`
const StyledLink = styled(NavLink)`
    padding: 10px;
    color: #000;
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
    transition: all .25s ease;

    &.active {
        color: #ccc;
    }

    &:hover {
        color: #f88000;
    }
`

const Calendar = () => (
    <section>
        <h2>Calendar</h2>
        <Ul>
            <Li><StyledLink to='/calendar/events'>Events</StyledLink></Li>
            <Li><StyledLink to='/calendar/past'>Past Events</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/calendar/events'} component={Events} />
            <Route path={'/calendar/past'} component={PastEvents} />
            <Route exact path={'/calendar'}>
                <Redirect to={'/calendar/events'} />
            </Route>
        </>
    </section>
)

export default Calendar
