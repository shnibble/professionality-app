import React from 'react'
import ReactQueryParams from 'react-query-params'
import UserContext from '../context/user'
import { Redirect } from 'react-router-dom'

class Login extends ReactQueryParams {

    componentDidMount() {
        const code = this.queryParams.code
        this.context.login(code)
    }

    render() {
        return (
            <>
                {(!this.context.logged_in || this.context.failed_login)
                ?
                <Redirect to='/' />
                :
                <div>
                    <p>Logging in...</p>
                </div>
                }
            </>
        )
    }
}
Login.contextType = UserContext
export default Login
