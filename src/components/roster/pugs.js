import React from 'react'
import { getPugs } from '../../services/roster'
import TableWrapper from '../tableWrapper'
import Table from './table'
import Character from './character'
import DiscordLink from './discordLink'
import Article from '../article'

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
            <Article>
                <TableWrapper>
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
                </TableWrapper>
            </Article>
        )
    }
}

export default Pugs
