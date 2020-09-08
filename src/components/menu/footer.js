import React, { useContext }  from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../../context/user'

const Container = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    background: ${props => props.theme.colors.sidebarFooter};

    @media screen and (min-width: 720px) {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`
const List = styled.ul`
    flex-grow: 1;
    flex-shrink: 1;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    grid-gap: 5px;
    padding: 5px;

    @media screen and (min-width: 720px) {
        flex-direction: column;
        justify-content: center;
    }
`
const StyledLink = styled(NavLink)`
    display: flex;
    flex-direction: row;
    height: 30px;
    min-width: 30px;
    padding: 5px;
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

        & > svg {
            fill: ${props => props.theme.colors.highlight};
        }
    }

    &.active {
        color: ${props => props.theme.colors.lowlight};
        
        & > svg {
            fill: ${props => props.theme.colors.lowlight};
        }
    }

    &:hover {
        color: ${props => props.theme.colors.highlight};
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
const StyledDiscordLink = styled.a`
    display: flex;
    flex-direction: row;
    height: 30px;
    min-width: 30px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
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

        & > svg {
            fill: ${props => props.theme.colors.highlight};
        }
    }

    &.active {
        color: ${props => props.theme.colors.lowlight};
        
        & > svg {
            fill: ${props => props.theme.colors.lowlight};
        }
    }

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }
`
const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    height: 30px;
    min-width: 30px;
    height: 40px;
    padding: 5px;
    background: none;
    border: none;
    text-align: center;
    text-decoration: none;
    color: ${props => props.theme.colors.color};
    font-weight: bold;
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
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

        & > svg {
            fill: ${props => props.theme.colors.highlight};
        }
    }

    &.active {
        color: ${props => props.theme.colors.lowlight};
        
        & > svg {
            fill: ${props => props.theme.colors.lowlight};
        }
    }

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }
`

const Footer = ({ active, toggleTheme, darkTheme }) => {

    const user = useContext(UserContext)
    const history = useHistory()

    const logout = () => {
        user.logout()
        history.push('/')
    }

    return (
        <UserContext.Consumer>
            {user => (
                <Container>
                    <List>
                        {(user.logged_in)
                        ?
                        <>
                            <StyledButton title='Toggle Dark Mode' onClick={toggleTheme}>   
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.23 241">
                                    <path d="M62,247.35C100.2,241.06,130,190,130,128S100.09,14.76,61.77,8.62L74,8a120,120,0,0,1,0,240Z" transform="translate(-61.27 -7.5)"/>
                                    <path d="M32,128" transform="translate(-61.27 -7.5)"/>
                                </svg>
                                <Title className={(active)?'active':''}>Toggle Dark Mode</Title>
                            </StyledButton>
                            <StyledButton title='Logout' onClick={logout}>   
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.21 241">
                                    <polygon points="56.71 144.5 56.71 176.5 0.71 120.5 56.71 64.5 56.71 96.5 104.71 96.5 104.71 144.5 56.71 144.5"/>
                                    <path d="M248,8V248H128V8Zm-8,124a12,12,0,1,0-12,12A12,12,0,0,0,240,132Z" transform="translate(-7.29 -7.5)"/>
                                    <polygon className="cls-1" points="0.71 120.5 56.71 64.5 56.71 96.5 104.71 96.5 104.71 144.5 56.71 144.5 56.71 176.5 0.71 120.5"/>
                                    <rect className="cls-1" x="120.71" y="0.5" width="120" height="240"/>
                                    <circle className="cls-1" cx="220.71" cy="124.5" r="12"/>
                                </svg>
                                <Title className={(active)?'active':''}>Logout</Title>
                            </StyledButton>
                            <StyledLink title='Account' to='/account'>   
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.55 241">
                                    <circle cx="98.28" cy="56.5" r="56"/>
                                    <path d="M50.28,120.5h96a49.78,49.78,0,0,1,49.78,49.78V240.5a0,0,0,0,1,0,0H.5a0,0,0,0,1,0,0V170.28A49.78,49.78,0,0,1,50.28,120.5Z"/>
                                </svg>
                                <Title className={(active)?'active':''}>Account</Title>
                            </StyledLink>
                        </>
                        :
                        <>
                            <StyledButton title='Toggle Dark Mode' onClick={toggleTheme}>   
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.23 241">
                                    <path d="M62,247.35C100.2,241.06,130,190,130,128S100.09,14.76,61.77,8.62L74,8a120,120,0,0,1,0,240Z" transform="translate(-61.27 -7.5)"/>
                                    <path d="M32,128" transform="translate(-61.27 -7.5)"/>
                                </svg>
                                <Title className={(active)?'active':''}>Toggle Dark Mode</Title>
                            </StyledButton>
                            <StyledDiscordLink title='Login' href='https://discord.com/api/oauth2/authorize?client_id=720699635076956210&redirect_uri=https%3A%2F%2Fprofessionality.app%2Flogin&response_type=code&scope=identify'>   
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 241.6">
                                    <path d="M177.28,140.87c-.71.5-19.79,13.91-48.58,13.91S79.7,141.94,79,141.46c.35.42,6,7.18,9.75,9.76s11,4.74,11,4.74l-6.23,9.78s-15.7-1.18-23.7-5.63-15.41-12.74-15.41-12.74.3-21.63,5-36.44S73,77.74,73,77.74s9.78-7.11,15.41-8.89,19.26-4.44,19.26-4.44l1.18,2.07S98.78,68.56,92,71.81c-6.6,3.16-13.2,9.66-13.61,10.06.71-.41,19.81-11.54,49.46-11.54s48.76,11.42,49.47,11.84c-.41-.46-7.05-7.77-14.8-10.36-8-2.66-14.81-4.74-14.81-4.74l.89-2.07s9.77,0,18.07,3.56a115,115,0,0,1,16.59,9.18s13.63,29.93,16,43.56a201.76,201.76,0,0,1,2.67,26.37s-6.82,8.59-16,12.44-23.11,4.74-23.11,4.74l-7.71-9.48s7.41-2.07,11.56-4.44S176.89,141.33,177.28,140.87Zm-12.8-17.76a13.56,13.56,0,1,0-13.55,13.56A13.55,13.55,0,0,0,164.48,123.11Zm-45.92-.55A13.56,13.56,0,1,0,105,136.11,13.56,13.56,0,0,0,118.56,122.56Z" transform="translate(-15.5 -7.5)"/>
                                    <path d="M240,36.93V248l-64-56,8,32H44.93A28.93,28.93,0,0,1,16,195.07V36.93A28.93,28.93,0,0,1,44.93,8H211.07A28.93,28.93,0,0,1,240,36.93ZM224,216.11V48.6A24.69,24.69,0,0,0,199.21,24H56.79A24.69,24.69,0,0,0,32,48.6V183.1a24.69,24.69,0,0,0,24.79,24.6H168l-6.86-38.21Z" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M176,192l8,32H44.93A28.93,28.93,0,0,1,16,195.07V36.93A28.93,28.93,0,0,1,44.93,8H211.07A28.93,28.93,0,0,1,240,36.93V248Z" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M118.56,122.56A13.56,13.56,0,1,1,105,109,13.56,13.56,0,0,1,118.56,122.56Z" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M164.48,123.11a13.56,13.56,0,1,1-13.55-13.55A13.56,13.56,0,0,1,164.48,123.11Z" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M78.93,141.44h0a0,0,0,0,1,0,0c.35.42,6,7.18,9.75,9.76s11,4.74,11,4.74l-6.23,9.78s-15.7-1.18-23.7-5.63-15.41-12.74-15.41-12.74.3-21.63,5-36.44S73,77.74,73,77.74s9.78-7.11,15.41-8.89,19.26-4.44,19.26-4.44l1.18,2.07S98.78,68.56,92,71.81c-6.6,3.16-13.2,9.66-13.61,10.06h0" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M177.3,140.85l0,0c-.71.5-19.79,13.91-48.58,13.91S79.7,141.94,79,141.46" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M177.28,82.17c-.41-.46-7.05-7.77-14.8-10.36-8-2.66-14.81-4.74-14.81-4.74l.89-2.07s9.77,0,18.07,3.56a115,115,0,0,1,16.59,9.18s13.63,29.93,16,43.56a201.76,201.76,0,0,1,2.67,26.37s-6.82,8.59-16,12.44-23.11,4.74-23.11,4.74l-7.71-9.48s7.41-2.07,11.56-4.44,10.26-9.6,10.65-10.06" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M78.35,81.87c.71-.41,19.81-11.54,49.46-11.54s48.76,11.42,49.47,11.84a0,0,0,0,0,0,0h0" transform="translate(-15.5 -7.5)"/>
                                    <path className="cls-1" d="M161.14,169.49,168,207.7H56.79A24.69,24.69,0,0,1,32,183.1V48.6A24.69,24.69,0,0,1,56.79,24H199.21A24.69,24.69,0,0,1,224,48.6V216.11Z" transform="translate(-15.5 -7.5)"/>
                                </svg>
                                <Title className={(active)?'active':''}>Discord Login</Title>
                            </StyledDiscordLink>
                        </>
                        }
                    </List>
                </Container>
            )}
        </UserContext.Consumer>
    )
}

export default Footer
