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
                Cookies.set('token', data.jwt, { expires: 30 })
            })
            .catch(err => {
                window.alert('Could not login:', err)
                this.setState({ failed_login: true })
            })
        }
    }

    verifyExistingLogin = (jwt) => {
        axios.post('https://professionality-api.com/account/verify', {
            jwt
        })
        .then(response => {
            const data = response.data
            console.log('response from verify endpoint:')
            console.log(response)
            // this.setState({
            //     logged_in: true,
            //     failed_login: false,
            //     is_member: data.member,
            //     is_officer: data.officer,
            //     nickname: data.nickname
            // })
        })
        .catch(err => {
            window.alert('Failed to login using your saved cookies. Try logging in again.')
            this.setState(initialState)
        })
    }

    logout = () => {
        Cookies.remove('token')
        this.setState(initialState)
    }

    componentDidUpdate() {
        localStorage.setItem('logged_in', JSON.stringify(this.state.logged_in))
        localStorage.setItem('failed_login', JSON.stringify(this.state.failed_login))
        localStorage.setItem('is_member', JSON.stringify(this.state.is_member))
        localStorage.setItem('is_officer', JSON.stringify(this.state.is_member))
        localStorage.setItem('nickname', JSON.stringify(this.state.nickname))
    }

    componentDidMount() {
        // gather data from page refresh
        const logged_in = JSON.parse(localStorage.getItem('logged_in'))
        const failed_login = JSON.parse(localStorage.getItem('failed_login'))
        const is_member = JSON.parse(localStorage.getItem('is_member'))
        const is_officer = JSON.parse(localStorage.getItem('is_officer'))
        const nickname = JSON.parse(localStorage.getItem('nickname'))


        this.setState({
            logged_in: logged_in || false,
            failed_login: failed_login || false,
            is_member: is_member || false,
            is_officer: is_officer || false,
            nickname: nickname || ''
        })

        // check for JWT if not logged in
        if (!logged_in) {
            const jwt = Cookies.get('token')
            if (jwt) {
                this.verifyExistingLogin(jwt)
            }
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
