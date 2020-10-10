import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import UserContext from '../../context/user'
import { signup, callout, cancel } from '../../services/attendance'
import TableButtonWrapper from '../tableButtonWrapper'
import TableButton from '../tableButton'
import Popout from '../popout'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'

const CharacterSelect = styled.select`
    padding: 5px;
    font-size: 16px;
    margin: 5px;
    width: 45%;
    box-sizing: border-box;
`
const RoleSelect = styled.select`
    padding: 5px;
    font-size: 16px;
    margin: 5px;
    width: 45%;
    box-sizing: border-box;
`
const CheckboxContainer = styled.label`
    display: block;
    position: relative;
    cursor: pointer;
    width: 125px;
    height: 25px;
    margin: 5px auto;
`
const CheckboxTitle = styled.span`
    display: inline-block;
    text-align: right;
    width: 100%;
    padding: 2px 27px 2px 2px;
    box-sizing: border-box;
`
const Checkbox = styled.input`
    display: none;

    &:checked + div {
        background-image: url(${CheckboxTrueImg});
    }
`
const Checkmark = styled.div`
    position: absolute;
    top: 0;
    left: 100px;
    height: 25px;
    width: 25px;
    background-image: url(${CheckboxFalseImg});
    background-size: 100%;
`
const NoteField = styled.input`
    display: block;
    padding: 5px;
    margin: 5px auto;
    font-size: 16px;
    width: 90%;
    box-sizing: border-box;
`

class AttendanceModule extends React.Component {
    state = {
        characters: [],
        characters_loaded: false,
        signup_active: false,
        updating: false,
        character_id: '',
        role_id: 1,
        tentative: false,
        late: false,
        note: ''
    }

    addSignupPopout = () => {
        if (this.state.characters.length === 0) {
            window.alert('You need to create a character first. Go to your account page and add a character!')
        } else {
            this.setState({ 
                signup_active: true ,
                character_id: this.props.event.character_id || this.state.characters[0].id,
                role_id: this.props.event.role_id || this.state.characters[0].role_id,
                tentative: this.props.event.tentative || false,
                late: this.props.event.late || false,
                note: this.props.event.note || ''
            })
        }
    }

    closeAddSignupPopout = () => {
        this.setState({ signup_active: false })
    }

    updateSignupCharacter = (ev) => {
        const character_id = ev.target.value
        const character_index = this.state.characters.findIndex(x => x.id === Number(character_id))
        this.setState({ 
            character_id, 
            role_id: (character_index === -1)?1:this.state.characters[character_index].role_id
        })
    }

    updateSignupRole = (ev) => {
        const role_id = ev.target.value
        this.setState({ role_id })
    }

    updateSignupTentative = (ev) => {
        const tentative = ev.target.checked
        this.setState({ tentative })
    }

    updateSignupLate = (ev) => {
        const late = ev.target.checked
        this.setState({ late })
    }

    updateSignupNote = (ev) => {
        const note = ev.target.value
        this.setState({ note })
    }

    handleSignup = () => {
        this.setState({ updating: true })
        const { character_id, role_id, tentative, late, note } = this.state
        if (character_id === '') {
            window.alert('Please select a character to sign up with.')
        } else {
            signup(this.props.event.id, character_id, role_id, tentative, late, note)
            .then(() => {
                this.setState({ 
                    updating: false,
                    signup_active: false, 
                    character_id: '',
                    role_id: 1,
                    tentative: false,
                    late: false,
                    note: ''
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Issue signing up, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    handleCallout = () => {
        this.setState({ updating: true })
        callout(this.props.event.id)
        .then(() => {
            this.props.loadDataFunction()
            this.setState({ updating: false })
        })
        .catch(err => {
            window.alert('Issue calling out, please try re-logging.')
            this.setState({ updating: false })
        })
    }

    handleCancel = () => {
        this.setState({ updating: true })
        cancel(this.props.event.id)
        .then(() => {
            this.props.loadDataFunction()
            this.setState({ updating: false })
        })
        .catch(err => {
            window.alert('Issue cancelling, please try re-logging.')
            this.setState({ updating: false })
        })
    }

    loadCharacters = () => {
        const user = this.context
        axios.get('https://professionality-api.com/account/get', {
            params: {
                discord_user_id: user.discord_user_id
            }
        })
        .then(result => {
            this.setState({ characters: result.data.characters, characters_loaded: true })
        })
    }

    componentDidUpdate() {
        const user = this.context
        if (user.logged_in && !this.state.characters_loaded) {
            this.loadCharacters()
        }
    }

    componentDidMount() {
        const user = this.context
        if (user.logged_in) {
            this.loadCharacters()
        }
    }

    render() {
        return (
            <TableButtonWrapper>
                <TableButton 
                    title='Sign Up' 
                    onClick={this.addSignupPopout} 
                    active={(this.props.event.signed_up)?true:false}
                    disabled={this.state.updating}
                />
                <TableButton 
                    title='Call Out' 
                    onClick={this.handleCallout} 
                    disabled={(this.props.event.called_out || this.state.updating)?true:false} 
                    active={(this.props.event.called_out)?true:false} 
                />
                <TableButton 
                    title='Cancel' 
                    onClick={this.handleCancel} 
                    disabled={((this.props.event.signed_up || this.props.event.called_out) && !this.state.updating)?false:true} 
                />
                {(this.state.signup_active)
                ?
                <Popout submitFunction={this.handleSignup} cancelFunction={this.closeAddSignupPopout} disabled={this.state.updating}>
                    <h4>Sign Up</h4>
                    <CharacterSelect value={this.state.character_id} onChange={this.updateSignupCharacter}>
                        <option></option>
                        {(this.state.characters.map(character => <option key={`user_character_id_${character.id}`} value={character.id}>{character.name}</option> ))}
                    </CharacterSelect>
                    <RoleSelect value={this.state.role_id} onChange={this.updateSignupRole}>
                        <option value={1}>Caster</option>
                        <option value={2}>Fighter</option>
                        <option value={3}>Healer</option>
                        <option value={4}>Tank</option>
                    </RoleSelect>
                    <CheckboxContainer>
                        <CheckboxTitle>Tentative:</CheckboxTitle>
                        <Checkbox type='checkbox' checked={(this.state.tentative)?true:false} onChange={this.updateSignupTentative} />
                        <Checkmark />
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <CheckboxTitle>Late:</CheckboxTitle>
                        <Checkbox type='checkbox' checked={(this.state.late)?true:false} onChange={this.updateSignupLate} />
                        <Checkmark />
                    </CheckboxContainer>
                    <NoteField type='text' value={this.state.note} onChange={this.updateSignupNote} placeholder='Note' />
                </Popout>
                :
                null
                }
            </TableButtonWrapper>
        )
    }
}

AttendanceModule.contextType = UserContext
export default AttendanceModule
