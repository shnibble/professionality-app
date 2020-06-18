import React from 'react'
import styled from 'styled-components'
import Logo from '../logo'
import Account from './account'
import MobileMenu from './mobileMenu'

const Container = styled.header`
    display: flex;
    flex-direction: row;
    background: #fff;
    box-shadow: 0 3px 3px 1px rgba(0,0,0,0.25);
    margin-bottom: 5px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 50px;
    z-index: 5;

    @media screen and (min-width: 720px) {
        position: static;
        height: auto;
    }
`
const TitleContainer = styled.div`
    padding: 5px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    display: none;
    font-family: 'Metal Mania', cursive;

    @media screen and (min-width: 400px) {
        display: block;
        font-size: 20px;
    }

    @media screen and (min-width: 720px) {
        font-size: 32px;
    }
`

const Header = () => (
    <Container>
        <Logo />
        <MobileMenu />
        <TitleContainer>
            <Title>Professionality</Title>
        </TitleContainer>
        <Account />
    </Container>
)


export default Header
