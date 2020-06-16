import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


const initialState = {
    logged_in: false,
    failed_login: false,
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
                    is_member: data.member,
                    is_officer: data.officer,
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
        console.log('verifyExistingLoging called...')
        const jwt = Cookies.get('token')
        
        if (jwt) {
            console.log('jwt found, sending http request to api...')
            axios.post('https://professionality-api.com/account/verify', {
                jwt
            })
            .then(response => {
                const data = response.data
                this.setState({
                    logged_in: true,
                    failed_login: false,
                    is_member: data.member,
                    is_officer: data.officer,
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
        console.log('Logging out.')
        Cookies.remove('token')
        this.setState(initialState)
    }

    componentDidUpdate() {
        console.log('Setting localStorage to state:', this.state)
        localStorage.setItem('user_state', JSON.stringify(this.state))
    }

    componentDidMount() {
        console.log('UserContext component did mount.')

        // gather data from page refresh
        const testLocalStorageState = localStorage.getItem('user_state')
        console.log('Testing localStorage:', testLocalStorageState)
        if (testLocalStorageState) {
            console.log('Found localStorage, loading it into state.')
            const user_state = JSON.parse(localStorage.getItem('user_state'))
            this.setState(user_state)

            if (!user_state.logged_in) {
                console.log('Found localStorage says user is not logged in, attempting to verify login via cookies.')
                this.verifyExistingLogin()
            }
        } else {
            console.log('No localStorage found, attempting to verify login via cookies.')
            this.verifyExistingLogin()
        }
    }

    render() {
        return (
            <UserContext.Provider value={{
                logged_in: this.state.logged_in,
                failed_login: this.state.failed_login,
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
