import React from 'react'
import styled from 'styled-components'
import { getMembers } from '../../services/roster'

const Container = styled.article`

`

class Members extends React.Component {
    state = {
        users: []
    }
    
    loadData = () => {
        getMembers()
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

export default Members
