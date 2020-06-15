import React from 'react'
import ReactQueryParams from 'react-query-params'
import UserContext from '../context/user'

class Login extends ReactQueryParams {

    componentDidMount() {
        const code = this.queryParams.code
        this.context.login(code)
    }

    render() {
        return (
            <h2>Login</h2>
        )
    }
}
Login.contextType = UserContext
export default Login
