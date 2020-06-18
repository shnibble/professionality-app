import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../context/user'
import { getUserAccount } from '../services/userAccount'
import character, { addCharacter } from '../services/character'
import Character from './character'

const Container = styled.section`

`
const Article = styled.article`
    margin: 50px 10px;
    padding: 5px;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.25);
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
const AddCharacterButton = styled.button`
    display: block;
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`
const AddCharacterPopoutContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
`
const AddCharacterPopout = styled.div`
    position: relative;
    background: #fff;
    max-width: 400px;
    height: 80vh;
    margin: 10vh auto;
    padding: 15px 15px 50px 15px;
    text-align: center;
    box-sizing: border-box;
`
const AddCharacterName = styled.input`
    font-size: 20px;
    padding: 15px;
    margin: 10px;
    text-align: center;
`
const AddCharacterButtonsContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
`
const AddCharacterAddButton = styled.button`
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`
const AddCharacterCancelButton = styled.button`
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`

class Account extends React.Component {
    state = { 
        loading: true,
        logout: false,
        data: null,
        addCharacter: false,
        characterName: ''
    }

    addCharacterPopout = () => {
        this.setState({ addCharacter: true })
    }

    closeAddCharacterPopout = () => {
        this.setState({ addCharacter: false })
    }

    updateCharacterName = (ev) => {
        const characterName = ev.target.value
        this.setState({ characterName })
    }

    addNewCharacter = () => {
        const character_name = this.state.characterName
        if (character_name.length > 1) {
            addCharacter(character_name)
            .then(() => {
                this.setState({
                    addCharacter: false,
                    characterName: ''
                })
                this.loadData()
            })
            .catch(err => {
                window.alert('Error adding character, please try re-logging.')
            })
        } else {
            window.alert('Please enter a valid character name.')
        }
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
                                    <td>{(this.state.data.member)?'Yes':'No'}</td>
                                </tr>
                                <tr>
                                    <td>Officer:</td>
                                    <td>{(this.state.data.officer)?'Yes':'No'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <LogoutButton onClick={this.logout}>Logout</LogoutButton>
                    </Article>
                    <Article>
                        <h3>Characters</h3>
                        <AddCharacterButton onClick={this.addCharacterPopout}>Add Character</AddCharacterButton>
                        {(this.state.data.characters)
                        ?
                        <>
                            {this.state.data.characters.map(character => ( <Character key={character.id} data={character} /> ))}
                        </>
                        :
                        <p>No characters (yet... please add them!)</p>}
                    </Article>
                    {(this.state.addCharacter)
                    ?
                    <AddCharacterPopoutContainer>
                        <AddCharacterPopout>
                            <h4>Add Character</h4>
                            <AddCharacterName value={this.state.characterName} onChange={this.updateCharacterName} placeholder='Character Name' />
                            <p><i>Please enter your character name exactly as it appears in-game.</i></p>
                            <AddCharacterButtonsContainer>
                                <AddCharacterAddButton onClick={this.addNewCharacter}>Add</AddCharacterAddButton>
                                <AddCharacterCancelButton onClick={this.closeAddCharacterPopout}>Cancel</AddCharacterCancelButton>
                            </AddCharacterButtonsContainer>
                        </AddCharacterPopout>
                    </AddCharacterPopoutContainer>
                    :
                    null
                    }
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
