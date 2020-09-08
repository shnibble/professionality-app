import React, { useState } from 'react'
import styled from 'styled-components'
import Nav from './nav'
import Footer from './footer'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    display: flex;
    flex-direction: row;
    background: ${props => props.theme.colors.sidebar};
    z-index: 3;
    transition: all .25s ease;
    
    @media screen and (min-width: 720px) {
        bottom: 0;
        height: auto;
        width: 50px;
        flex-direction: column;

        &.active {
            width: 200px;
        }
    }
`
const Header = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    display: none;
    position: relative;
    width: 100%;

    @media screen and (min-width: 720px) {
        display: block;
        height: 50px;
    }
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
    &:hover > div {
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

const Menu = ({ toggleTheme, darkTheme }) => {
    const [active, setActive] = useState(false)
    const toggleActive = () => {
        setActive(!active)
    }
    return (
        <Container className={(active)?'active':''}>
            <Header>
                <HeaderTitle className={(active)?'active':''}>Menu</HeaderTitle>
                <MenuButton onClick={toggleActive} className={(active)?'active':''}>
                    <div />
                    <div />
                </MenuButton>
            </Header>
            <Nav active={active} />
            <Footer active={active} toggleTheme={toggleTheme} darkTheme={darkTheme} />
        </Container>
    )
}
    

export default Menu