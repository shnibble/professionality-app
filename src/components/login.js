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

class Login extends ReactQueryParams {
    state = initialState

    exchangeCode = (code) => {
        
        // validate code
        if (typeof code === 'undefined' || code === '') {
            console.log('Invalid code')
        } else {
            console.log('valid code...')
            axios.post('https://professionality-api.com/account/login', {
                code
            })
            .then(response => {
                const data = response.data
                this.setState({
                    logged_in: true,
                    is_member: data.member,
                    is_officer: data.officer,
                    nickname: data.nickname
                })
                Cookies.set('token', JWT, { expires: 30 })
            })
            .catch(err => {
                window.alert('Could not login:', err)
            })
        }
    }

    componentDidMount() {
        const code = this.queryParams.code
        this.exchangeCode(code)
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
            </div>
        )
    }
}

export default Login
