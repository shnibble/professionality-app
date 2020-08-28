import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: -200px;
    bottom: 0;
    width: 200px;
    background: ${props => props.theme.colors.menuBackground};
    transition: all .25s ease;

    &.active {
        left: 0;
    }

    @media screen and (min-width: 720px) {
        display: none;
    }
`
const Nav = styled.nav`
    height: 100%;
    overflow-y: auto;
    margin: 0 50px;
`
const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Li = styled.li`
    margin: 0 10px;
`
const StyledLink = styled(NavLink)`
    display: block;
    padding: 10px;
    color: #000;
    font-weight: bold;
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    color: ${props => props.theme.colors.color};
    transition: all .25s ease;

    &.active {
        color: ${props => props.theme.colors.lowlight};
    }

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }
`
const Button = styled.button`
    position: absolute;
    right: -50px;
    top: 0px;
    width: 50px;
    height: 50px;
    font-size: 30px;
    padding: 5px;
    background: none;
    border: none;
    font-family: 'Metal Mania', cursive;
    cursor: pointer;
    color: ${props => props.theme.colors.color};

    &.active {
        right: 0;
    }

    &:focus {
        outline: none;
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

class MobileMenu extends React.Component {
    state = {
        active: false
    }

    toggleMenu = () => {
        this.setState({ active: !this.state.active })
    }

    render() {
        return (
            <Container className={(this.state.active)?'active':''}>
                <Nav>
                    <Ul>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} exact to='/'>Home</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/calendar'>Calendar</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/epgp'>EPGP</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/roster'>Roster</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/bank'>Bank</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/loot'>Loot</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/rules'>Rules</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/strategies'>Strategies</StyledLink></Li>
                        <Li><StyledLink activeClassName='active' onClick={this.toggleMenu} to='/assignments'>Assignments</StyledLink></Li>
                        <Li><DarkModeButton onClick={this.props.toggleTheme}>Dark Mode</DarkModeButton></Li>
                    </Ul>
                </Nav>
                <Button className={(this.state.active)?'active':''} onClick={this.toggleMenu}>{(this.state.active)?'X':'|||'}</Button>
            </Container>
        )
    }
}

export default MobileMenu
