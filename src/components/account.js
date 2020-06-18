import React from 'react'
import styled from 'styled-components'
import UserContext from '../context/user'
import { getUserAccount } from '../services/userAccount'
import Character from './character'

const Container = styled.section`

`
const Article = styled.article`
    margin: 50px 10px;
`

class Account extends React.Component {
    state = { 
        loading: true,
        data: null 
    }

    loadData = () => {
        let user = this.context
        if (user.logged_in) {
            getUserAccount(user.discord_user_id)
            .then(data => {
                if (data) {
                    this.setState({ data, loading: false })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                window.alert('Issue retrieving user data. Please try logging out and back in.')
            })
        }
    }

    componentDidUpdate = () => {
        if (this.state.loading && this.state.data === null) {
            this.loadData()
        }
    }
    
    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <Container>
                <h2>Account</h2>
                {(this.state.loading)
                ?
                <Article>
                    <p>Loading account information...</p>
                </Article>
                :
                (this.state.data)
                ?
                <>
                    <Article>
                        <h3>Discord Details</h3>
                        <p><i>Note: if any information below doesn't match your current session please try re-logging to sync the data.</i></p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Nickname:</td>
                                    <td>{this.state.data.nickname}</td>
                                </tr>
                                <tr>
                                    <td>Member:</td>
                                    <td>{(this.state.data.member)?'Yes':'No'}</td>
                                </tr>
                                <tr>
                                    <td>Officer:</td>
                                    <td>{(this.state.data.officer)?'Yes':'No'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Article>
                    <Article>
                        <h3>Characters</h3>
                        {(this.state.data.characters)
                        ?
                        <>
                            {this.state.data.characters.map(character => ( <Character key={character.id} data={character} /> ))}
                        </>
                        :
                        <p>No characters (yet... please add them!)</p>}
                    </Article>
                </>
                :
                <Article>
                    <p>No account information to display.</p>
                </Article>
                }
            </Container>
        )
    }
    
}

Account.contextType = UserContext
export default Account
