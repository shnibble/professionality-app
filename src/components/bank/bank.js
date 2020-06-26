import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Goals from './goals'
import Inventory from './inventory'
import Requests from './requests'

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

const Bank = () => (
    <section>
        <h2>Bank</h2>
        <Ul>
            <Li><StyledLink to='/bank/goals'>Goals</StyledLink></Li>
            <Li><StyledLink to='/bank/inventory'>Inventory</StyledLink></Li>
            <Li><StyledLink to='/bank/requests'>Requests</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/bank/goals'} component={Goals} />
            <Route path={'/bank/inventory'} component={Inventory} />
            <Route path={'/bank/requests'} component={Requests} />
            <Route exact path={'/bank'}>
                <Redirect to={'/bank/goals'} />
            </Route>
        </>
    </section>
)

export default Bank
