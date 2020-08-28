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
    color: ${props => props.theme.colors.color};
    font-weight: bold;
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    transition: all .25s ease;

    &.active {
        color: ${props => props.theme.colors.lowlight};
    }

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }
`
const DarkModeButton = styled.button`
    background: #f88000;
    color: #fff;
    border: none;
    padding: 5px;
    margin: 10px 0;
    border-radius: 2px;
    cursor: pointer;
`

const Nav = ({ toggleTheme=null }) => (
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
            <Li><DarkModeButton onClick={toggleTheme}>Dark Mode</DarkModeButton></Li>
        </Ul>
    </Container>
)

export default Nav
