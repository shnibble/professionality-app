import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: -215px;
    bottom: 0;
    width: 215px;
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
const DarkModeContainer = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 12px;
`
const CheckboxContainer = styled.label`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    margin: 2px;

    &:hover {
        background: #606060;
    }
`
const Checkbox = styled.input`
    display: none;

    &:checked + div {
        background-image: url(${CheckboxTrueImg});
    }
`
const Checkmark = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-image: url(${CheckboxFalseImg});
    background-size: 100%;
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
                        <Li>
                            <DarkModeContainer>
                                <span>Dark Mode:</span>
                                <CheckboxContainer>
                                    <Checkbox type='checkbox' checked={this.props.darkTheme} onChange={this.props.toggleTheme} />
                                    <Checkmark />
                                </CheckboxContainer>
                            </DarkModeContainer>
                        </Li>
                    </Ul>
                </Nav>
                <Button className={(this.state.active)?'active':''} onClick={this.toggleMenu}>{(this.state.active)?'X':'|||'}</Button>
            </Container>
        )
    }
}

export default MobileMenu
