import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.nav`
    display: none;

    @media screen and (min-width: 720px) {
        display: block;
    }
`
const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`
const Li = styled.li`
    margin: 5px;
`
const StyledLink = styled(NavLink)`
    padding: 10px;
    color: #000;
    font-weight: bold;
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

const Nav = () => (
    <Container>
        <Ul>
            <Li><StyledLink exact activeClassName='active' to='/'>Home</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/calendar'>Calendar</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/epgp'>EPGP</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/roster'>Roster</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/bank'>Bank</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/loot'>Loot</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/rules'>Rules</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/strategies'>Strategies</StyledLink></Li>
            <Li><StyledLink activeClassName='active' to='/assignments'>Assignments</StyledLink></Li>
        </Ul>
    </Container>
)

export default Nav
