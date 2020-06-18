import React from 'react'
import styled from 'styled-components'
import { NavLink, Route } from 'react-router-dom'
import Pugs from './pugs'
import Members from './members'
import Officers from './officers'

const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`
const Li = styled.li`
    margin: 5;
`
const StyledLink = styled(NavLink)`
    padding: 10px;
    color: #000;
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
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
        <article>
            <Ul>
                <li><StyledLink to='/roster/members'>Members</StyledLink></li>
                <li><StyledLink to='/roster/officers'>Officers</StyledLink></li>
                <li><StyledLink to='/roster/pugs'>PUGs</StyledLink></li>
            </Ul>
        </article>
        <>
            <Route path={'/roster/pugs'} component={Pugs} />
            <Route path={'/roster/members'} component={Members} />
            <Route path={'/roster/officers'} component={Officers} />
        </>
    </section>
)

export default Roster
