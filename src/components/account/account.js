import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../../context/user'
import { getUserAccount } from '../../services/userAccount'
import CheckBoxTrueImg from '../../images/checkbox-true.png'
import CheckBoxFalseImg from '../../images/checkbox-false.png'
import Character from './character'
import AddCharacter from './addCharacter'
import Article from '../article'

const Container = styled.section`

`
const Checkbox = styled.img`
    width: 30px;
    height: 30px;
    margin: 2px;
`
const LogoutButton = styled.button`
    display: block;
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }

    @media screen and (min-width: 720px) {
        display: none;
    }
`

class Account extends React.Component {
    state = { 
        loading: true,
        logout: false,
        data: null
    }

    autoTimeout = () => {
        setTimeout(() => {
            if (this.state.loading) {
                window.alert('Failed to load account information. Please try logging out and back in.')
                this.setState({ logout: true })
            }
        }, 3000)
    }

    logout = () => {
        let user = this.context
        user.logout()
        this.setState({ logout: true })
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
                window.alert('Failed to load account information. Please try logging out and back in.')
                this.setState({ logout: true })
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
        this.autoTimeout()
    }

    render() {
        return (
            <Container>
                <h2>Account</h2>
                {(this.state.logout)
                ?
                <Redirect to='/' />
                :
                (this.state.loading)
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
                                    <td><Checkbox src={(this.state.data.member)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                </tr>
                                <tr>
                                    <td>Officer:</td>
                                    <td><Checkbox src={(this.state.data.officer)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <LogoutButton onClick={this.logout}>Logout</LogoutButton>
                    </Article>
                    <Article>
                        <h3>Characters</h3>
                        <AddCharacter />
                        {(this.state.data.characters)
                        ?
                        <>
                            {this.state.data.characters.map(character => ( <Character key={character.id} data={character} loadData={this.loadData} /> ))}
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
