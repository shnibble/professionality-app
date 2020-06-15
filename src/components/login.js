import React from 'react'
import ReactQueryParams from 'react-query-params'

class Login extends ReactQueryParams {
    
    componentDidMount() {
        const code = this.queryParams.code
        this.props.context.login(code)
    }

    render() {
        return (
            <h2>Login</h2>
        )
    }
}

export default Login
