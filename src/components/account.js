import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../context/user'
import { getUserAccount } from '../services/userAccount'
import { addCharacter } from '../services/character'
import CheckBoxTrueImg from '../images/checkbox-true.png'
import CheckBoxFalseImg from '../images/checkbox-false.png'
import Character from './character'
import Article from './article'
import Popout from './popout'

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
const AddCharacterName = styled.input`
    font-size: 20px;
    padding: 15px;
    margin: 10px;
    text-align: center;
`
const AddCharacterSelect = styled.select`
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
        characterName: '',
        characterRace: '1',
        characterClass: '1',
        characterRole: '1',
    }

    addCharacterPopout = () => {
        this.setState({ addCharacter: true })
    }

    closeAddCharacterPopout = () => {
        this.setState({ 
            addCharacter: false,
            characterName: '',
            characterRace: '1',
            characterClass: '1',
            characterRole: '1',
         })
    }

    updateCharacterName = (ev) => {
        const characterName = ev.target.value
        this.setState({ characterName })
    }

    updateCharacterRace = (ev) => {
        const characterRace = ev.target.value
        this.setState({ characterRace })
    }

    updateCharacterClass = (ev) => {
        const characterClass = ev.target.value
        this.setState({ characterClass })
    }

    updateCharacterRole = (ev) => {
        const characterRole = ev.target.value
        this.setState({ characterRole })
    }

    addNewCharacter = () => {
        const { characterName, characterRace, characterClass, characterRole } = this.state
        if (characterName.length > 1) {
            addCharacter(characterName, characterRace, characterClass, characterRole)
            .then(() => {
                this.setState({
                    addCharacter: false,
                    characterName: '',
                    characterRace: '1',
                    characterClass: '1',
                    characterRole: '1',
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
                        <AddCharacterButton onClick={this.addCharacterPopout}>Add Character</AddCharacterButton>
                        {(this.state.data.characters)
                        ?
                        <>
                            {this.state.data.characters.map(character => ( <Character key={character.id} data={character} loadData={this.loadData} /> ))}
                        </>
                        :
                        <p>No characters (yet... please add them!)</p>}
                    </Article>
                    {(this.state.addCharacter)
                    ?
                    <Popout>
                        <h4>Add Character</h4>
                        <AddCharacterName value={this.state.characterName} onChange={this.updateCharacterName} placeholder='Character Name' />
                        <p><i>Please enter your character name exactly as it appears in-game.</i></p>
                        <AddCharacterSelect value={this.state.characterRace} onChange={this.updateCharacterRace}>
                            <option value={1}>Human</option>
                            <option value={3}>Dwarf</option>
                            <option value={4}>Night Elf</option>
                            <option value={7}>Gnome</option>
                        </AddCharacterSelect>
                        <AddCharacterSelect value={this.state.characterClass} onChange={this.updateCharacterClass}>
                            <option value={1}>Warrior</option>
                            <option value={2}>Paladin</option>
                            <option value={3}>Hunter</option>
                            <option value={4}>Rogue</option>
                            <option value={5}>Priest</option>
                            <option value={8}>Mage</option>
                            <option value={9}>Warlock</option>
                            <option value={11}>Druid</option>
                        </AddCharacterSelect>
                        <AddCharacterSelect value={this.state.characterRole} onChange={this.updateCharacterRole}>
                            <option value={1}>Caster</option>
                            <option value={2}>Fighter</option>
                            <option value={3}>Healer</option>
                            <option value={4}>Tank</option>
                        </AddCharacterSelect>
                        <AddCharacterButtonsContainer>
                            <AddCharacterAddButton onClick={this.addNewCharacter}>Add</AddCharacterAddButton>
                            <AddCharacterCancelButton onClick={this.closeAddCharacterPopout}>Cancel</AddCharacterCancelButton>
                        </AddCharacterButtonsContainer>
                    </Popout>
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
