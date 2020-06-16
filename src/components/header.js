import React from 'react'
import UserContext from '../context/user'

const Header = () => {

    return (
        <UserContext.Consumer>
            {user => (
                <header>
                    <h1>Professionality</h1>
                    {(user.logged_in)
                    ?
                    <div>
                        <p>Welcome {user.nickname}!</p>
                        <button onClick={user.logout}>Logout</button>
                    </div>
                    :
                    <a href="https://discord.com/api/oauth2/authorize?client_id=720699635076956210&redirect_uri=https%3A%2F%2Fprofessionality.app%2Flogin&response_type=code&scope=identify">
                        Login with Discord
                    </a>
                    }
                </header>
            )}
        </UserContext.Consumer>
    )
}

export default Header
