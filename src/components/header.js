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
                    <button onClick={user.logout}>Logout</button>
                    :
                    null
                    }
                </header>
            )}
        </UserContext.Consumer>
    )
}

export default Header
