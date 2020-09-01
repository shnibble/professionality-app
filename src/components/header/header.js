import React from 'react'
import styled from 'styled-components'
import Logo from '../logo'
import Account from './account'
import MobileMenu from './mobileMenu'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'

const Container = styled.header`
    display: flex;
    flex-direction: row;
    background: ${props => props.theme.colors.background};
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
    color: ${props => props.theme.colors.color};

    @media screen and (min-width: 400px) {
        display: block;
        font-size: 20px;
    }

    @media screen and (min-width: 720px) {
        font-size: 32px;
    }
`
const DarkModeContainer = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    display: none;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 720px) {
        display: flex;
    }
`
const CheckboxContainer = styled.label`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 4px;

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

const Header = ({ toggleTheme=null, darkTheme=false }) => (
    <Container>
        <Logo />
        <MobileMenu toggleTheme={toggleTheme} darkTheme={darkTheme} />
        <TitleContainer>
            <Title>Professionality</Title>
        </TitleContainer>
        <DarkModeContainer>
            <span>Dark Mode:</span>
            <CheckboxContainer>
                <Checkbox type='checkbox' checked={darkTheme} onChange={toggleTheme} />
                <Checkmark />
            </CheckboxContainer>
        </DarkModeContainer>
        <Account />
    </Container>
)


export default Header
