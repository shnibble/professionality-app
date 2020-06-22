import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


const initialState = {
    logged_in: false,
    failed_login: false,
    discord_user_id: '',
    is_member: false,
    is_officer: false,
    nickname: ''
}

const UserContext = React.createContext()

class UserProvider extends React.Component {

    state = initialState

    login = (code) => {
        this.setState({ failed_login: false })

        // validate code
        if (typeof code === 'undefined' || code === '') {
            window.alert('Invalid Discord login code. Please try logging in again.')
            this.setState({ failed_login: true })
        } else {
            axios.post('https://professionality-api.com/account/login', { code })
            .then(response => {
                const data = response.data
                this.setState({
                    logged_in: true,
                    discord_user_id: data.discord_user_id,
                    is_member: data.is_member,
                    is_officer: data.is_officer,
                    nickname: data.nickname
                })
                Cookies.set('token', data.jwt, { expires: 30, secure: true, sameSite: 'lax' })
            })
            .catch(err => {
                window.alert('Could not login:', err)
                this.setState({ failed_login: true })
            })
        }
    }

    verifyExistingLogin = () => {
        const jwt = Cookies.get('token')
        
        if (jwt) {
            axios.post('https://professionality-api.com/account/verify', {
                jwt
            })
            .then(response => {
                const data = response.data
                this.setState({
                    logged_in: true,
                    failed_login: false,
                    discord_user_id: data.discord_user_id,
                    is_member: data.is_member,
                    is_officer: data.is_officer,
                    nickname: data.nickname
                })
            })
            .catch(err => {
                window.alert('Failed to login using your saved cookies. Try logging in again.')
                this.setState(initialState)
            })
        }
    }

    logout = () => {
        Cookies.remove('token')
        this.setState(initialState)
    }

    componentDidMount() {
        this.verifyExistingLogin()
    }

    render() {
        return (
            <UserContext.Provider value={{
                logged_in: this.state.logged_in,
                failed_login: this.state.failed_login,
                discord_user_id: this.state.discord_user_id,
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
