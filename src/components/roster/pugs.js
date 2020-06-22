import React from 'react'
import styled from 'styled-components'
import { getPugs } from '../../services/roster'
import Table from './table'
import Character from './character'
import DiscordLink from './discordLink'

const Container = styled.article`
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.25);
    padding: 10px;
`

class Pugs extends React.Component {
    state = {
        users: []
    }
    
    loadData = () => {
        getPugs()
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
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Discord</th>
                            <th>Characters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.users.map(user => (
                            <tr key={user.discord_user_id}>
                                <td>{user.nickname}</td>
                                <td><DiscordLink data={user} /></td>
                                <td>
                                    {user.characters.map(character => <Character key={`character_id_${character.id}`} data={character} /> )}
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Pugs
