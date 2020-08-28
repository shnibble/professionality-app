import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../../context/user'

const Container = styled.div`
    flex-grow: 0;
    padding: 5px;
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const AccountLink = styled(NavLink)`
    color: ${props => props.theme.colors.color};
    font-weight: bold;
    margin: 5px 0;
    padding: 5px 0;
    transition: all .25s ease;

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }
`
const Button = styled.button`
    display: none;
    width: 100%;
    cursor: pointer;
    border-radius: 4px;
    background: red;
    color: #f2f2f2;
    padding: 5px;
    border: 2px solid red;
    padding: 2px;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }

    @media screen and (min-width: 720px) {
        display: block;
    }
`
const DiscordLoginLink = styled.a`
    color: #7289da;
    font-weight: bold;
`

const Account = () => {

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
                    {(user.logged_in)
                    ?
                    <>
                        <AccountLink to='/account'>{user.nickname}</AccountLink>
                        <Button onClick={logout}>Logout</Button>
                    </>
                    :
                    <DiscordLoginLink href="https://discord.com/api/oauth2/authorize?client_id=720699635076956210&redirect_uri=https%3A%2F%2Fprofessionality.app%2Flogin&response_type=code&scope=identify">
                        Login with Discord
                    </DiscordLoginLink>
                    }
                </Container>
            )}
        </UserContext.Consumer>
    )
}

export default Account
