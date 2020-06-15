import React from 'react'
import ReactQueryParams from 'react-query-params'
import axios from 'axios'

const initialState = {
    access_token: '',
    logged_in: false,
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
                console.log('response =', response)
            })
            .catch(err => {
                console.log('error =', err)
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
