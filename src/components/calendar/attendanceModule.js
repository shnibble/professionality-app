import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import styled, { ThemeConsumer } from 'styled-components'
import UserContext from '../../context/user'
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
const SubmitButton = styled.button`
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
const CancelButton = styled.button`
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

class AttendanceModule extends React.Component {
    state = {
        characters: [],
        characters_loaded: false,
        signup_active: false,
        character_id: '',
        role_id: 1,
        tentative: false,
        late: false,
        note: ''
    }

    addSignupPopout = () => {
        if (this.state.characters.length === 0) {
            window.alert('You need to create a character first. Go to your account page (top right corner, click on your name) and add a character!')
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

    signup = () => {
        const { character_id, role_id, tentative, late, note } = this.state
        if (character_id === '') {
            window.alert('Please select a character to sign up with.')
        } else {
            axios.post('https://professionality-api.com/attendance/signup', {
                jwt: Cookies.get('token'),
                event_id: this.props.event.id,
                character_id,
                role_id,
                tentative,
                late,
                note
            })
            .then(() => {
                this.setState({ 
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
            })
        }
    }

    callout = () => {
        axios.post('https://professionality-api.com/attendance/callout', {
            jwt: Cookies.get('token'),
            event_id: this.props.event.id,
        })
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Issue calling out, please try re-logging.')
        })
    }

    cancel = () => {
        axios.post('https://professionality-api.com/attendance/cancel', {
            jwt: Cookies.get('token'),
            event_id: this.props.event.id,
        })
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Issue canceling, please try re-logging.')
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
                />
                <TableButton 
                    title='Call Out' 
                    onClick={this.callout} 
                    disabled={(this.props.event.called_out)?true:false} 
                    active={(this.props.event.called_out)?true:false} 
                />
                <TableButton 
                    title='Cancel' 
                    onClick={this.cancel} 
                    disabled={(this.props.event.signed_up || this.props.event.called_out)?false:true} 
                />
                {(this.state.signup_active)
                ?
                <Popout>
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
                    <div>
                        <SubmitButton onClick={this.signup}>Sign Up</SubmitButton>
                        <CancelButton onClick={this.closeAddSignupPopout}>Cancel</CancelButton>
                    </div>

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
