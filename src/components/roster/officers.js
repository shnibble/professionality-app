import React from 'react'
import styled from 'styled-components'
import { getOfficers } from '../../services/roster'
import Table from './table'
import Character from './character'
import DiscordLink from './discordLink'
import Article from '../article'

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
            <Article>
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
            </Article>
        )
    }
}

export default Officers
