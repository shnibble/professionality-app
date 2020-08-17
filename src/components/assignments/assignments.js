import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Bwl from './bwl'

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

const Assignments = () => (
    <section>
        <h2>Assignments</h2>
        <Ul>
            <Li><StyledLink to='/assignments/bwl'>Blackwing Lair</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/assignments/bwl'} component={Bwl} />
            <Route exact path={'/assignments'}>
                <Redirect to={'/assignments/bwl'} />
            </Route>
        </>
    </section>
)

export default Assignments
