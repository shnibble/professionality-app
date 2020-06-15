import React from 'react'
import ReactQueryParams from 'react-query-params'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    logged_in: false,
    is_member: false,
    is_officer: false,
    nickname: ''
}

const UserContext = React.createContext(initialState)

class UserProvider extends React.Component {

    state = initialState

    login = (code) => {
        // validate code
        if (typeof code === 'undefined' || code === '') {
            window.alert('Invalid Discord login code. Please try logging in again.')
        } else {
            axios.post('https://professionality-api.com/account/login', { code })
            .then(response => {
                const data = response.data
                this.setState({
                    logged_in: true,
                    is_member: data.member,
                    is_officer: data.officer,
                    nickname: data.nickname
                })
                Cookies.set('token', data.jwt, { expires: 30 })
            })
            .catch(err => {
                window.alert('Could not login:', err)
            })
        }
    }

    logout = () => {
        Cookies.remove('token')
        this.setState(initialState)
    }

    render() {
        return (
            <UserContext.Provider value={{
                logged_in: this.state.logged_in,
                is_member: this.state.is_member,
                is_officer: this.state.is_officer,
                nickname: this.state.nickname,
                login: this.login,
                logout: this.logout
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContext
export { UserProvider }
