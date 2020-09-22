import React from 'react'
import styled from 'styled-components'
import Nav from './nav'
import Footer from './footer'

const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colors.sidebar};
    z-index: 3;
    transition: all .25s ease;

    &.active {
        width: 200px;
    }
`
const Header = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    width: 100%;
    height: 50px;
`
const HeaderTitle = styled.h2`
    display: inline-block;
    position: absolute;
    font-size: 14px;
    line-height: 14px;
    width: 50px;
    text-align: center;
    top: 36px;
    left: 0;
    transition: all .25s ease;

    &.active {
        width: 150px;
        top: 0;
        line-height: 50px;
        font-size: 24px;
    }
`
const MenuButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background: none;
    border: none;
    cursor: pointer;
    transition: all .25s ease;

    &:focus {
        outline: none;
    }

    &:hover > div, &:focus > div {
        outline: none;
        background: ${props => props.theme.colors.highlight};
    }

    &.active {
        & > div {
            &:nth-child(1) {
                top: 24px;
                transform: rotate(45deg);
            }
            &:nth-child(2) {
                top: 24px;
                transform: rotate(-45deg);
            }
        }
    }

    & > div {
        position: absolute;
        left: 5px;
        width: 40px;
        height: 2px;
        background: ${props => props.theme.colors.color};
        transition: all .25s ease;

        &:nth-child(1) {
            top: 19px;
        }
        &:nth-child(2) {
            top: 29px;
        }
    }
`

const Menu = ({ menuOpen, toggleMenu, toggleTheme, darkTheme }) => {
    let buttonRef = React.createRef()

    const handleToggleMenu = () => {
        buttonRef.current.blur()
        toggleMenu()
    }
    return (
        <Container className={(menuOpen)?'active':''}>
            <Header>
                <HeaderTitle className={(menuOpen)?'active':''}>Menu</HeaderTitle>
                <MenuButton onClick={handleToggleMenu} className={(menuOpen)?'active':''} ref={buttonRef}>
                    <div />
                    <div />
                </MenuButton>
            </Header>
            <Nav active={menuOpen} />
            <Footer active={menuOpen} toggleTheme={toggleTheme} darkTheme={darkTheme} />
        </Container>
    )
}
    

export default Menu