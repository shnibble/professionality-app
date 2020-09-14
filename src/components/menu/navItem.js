import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledLink = styled(NavLink)`
    display: flex;
    flex-direction: row;
    height: 30px;
    min-width: 30px;
    padding: 10px 5px;
    text-align: center;
    color: ${props => props.theme.colors.color};
    font-weight: bold;
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    transition: all .25s ease;

    & > svg {
        flex-grow: 0;
        flex-shrink: 0;
        height: 30px;
        width: 30px;
        fill: ${props => props.theme.colors.color};
        transition: all .25s ease;

        & .cls-1 {
            fill: none;
        }
    }

    &:hover, &:focus {
        outline: none;
        background: #424e57;
    }

    &.active {
        color: ${props => props.theme.colors.lowlight};
        
        & > svg {
            fill: ${props => props.theme.colors.lowlight};
        }
    }

    @media screen and (min-width: 720px) {
        padding: 5px 10px;
    }
`
const Title = styled.span`
    flex-grow: 1;
    flex-shrink: 1;
    display: none;
    line-height: 20px;
    padding: 5px;

    &.active {
        display: inline-block;
    }
`

const NavItem = ({ active, title, children, ...rest }) => (
    <StyledLink title={title} {...rest}>
        {children}
        <Title className={(active)?'active':''}>{title}</Title>
    </StyledLink>
)

export default NavItem
