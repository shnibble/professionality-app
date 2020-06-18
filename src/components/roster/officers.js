import React from 'react'
import styled from 'styled-components'
import { getOfficers } from '../../services/roster'

const Container = styled.article`

`

class Officers extends React.Component {
    state = {
        users: []
    }

    loadData = () => {
        getOfficers()
        .then(results => {
            this.setState({ users: results })
        })
    }
    
    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <Container>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.users.map(user => (
                            <tr key={user.discord_user_id}>
                                <td>{user.nickname}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </Container>
        )
    }
}

export default Officers
