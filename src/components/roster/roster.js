import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Pugs from './pugs'
import Members from './members'
import Officers from './officers'

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

const Roster = () => (
    <section>
        <h2>Roster</h2>
        <Ul>
            <Li><StyledLink to='/roster/members'>Members</StyledLink></Li>
            <Li><StyledLink to='/roster/officers'>Officers</StyledLink></Li>
            <Li><StyledLink to='/roster/pugs'>PUGs</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/roster/pugs'} component={Pugs} />
            <Route path={'/roster/members'} component={Members} />
            <Route path={'/roster/officers'} component={Officers} />
            <Route exact path={'/roster'}>
                <Redirect to={'/roster/members'} />
            </Route>
        </>
    </section>
)

export default Roster
