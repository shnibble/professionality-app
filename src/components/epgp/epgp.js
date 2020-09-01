import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Info from './info'
import PugTracker from './pugTracker'

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
    color: ${props => props.theme.colors.color};
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
    transition: all .25s ease;

    &.active {
        color: ${props => props.theme.colors.lowlight};
    }

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }
`

const Roster = () => (
    <section>
        <h2>EPGP</h2>
        <Ul>
            <Li><StyledLink to='/epgp/info'>Info</StyledLink></Li>
            <Li><StyledLink to='/epgp/pugtracker'>PUG Tracker</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/epgp/info'} component={Info} />
            <Route path={'/epgp/pugtracker'} component={PugTracker} />
            <Route exact path={'/epgp'}>
                <Redirect to={'/epgp/info'} />
            </Route>
        </>
    </section>
)

export default Roster
