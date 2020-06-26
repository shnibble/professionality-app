import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import Cookies from 'js-cookie'
import UserContext from '../../context/user'
import Article from '../article'
import TableWrapper from '../tableWrapper'
import AddButton from '../addButton'
import TableButtonWrapper from '../tableButtonWrapper'
import TableButton from '../tableButton'
import Popout from '../popout'
import CasterIcon from '../../images/spell_fire_firebolt02.jpg'
import FighterIcon from '../../images/ability_warrior_challange.jpg'
import HealerIcon from '../../images/spell_holy_flashheal.jpg'
import TankIcon from '../../images/ability_warrior_defensivestance.jpg'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'

const Container = styled.section`

`
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    text-align: center;

    & tr > th, & tr > td {
        padding: 5px;
    }

    & tbody > tr:nth-child(odd) {
        background: #f2f2f2;
    }

    & tbody td:nth-child(1) { 
        min-width: 100px;
    }
`
const TableIcon = styled.img`
    width: 20px;
    height: 20px;
`
const AddEventTime = styled(DatePicker)`
    font-size: 20px;
    padding: 15px;
    margin: 10px;
    text-align: center;
`
const AddEventName = styled.input`
    font-size: 20px;
    padding: 15px;
    margin: 10px;
    text-align: center;
`
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

class Events extends React.Component {
    state = {
        error: false,
        loading: true,
        loadedWithUser: false,
        events: [],
        addEvent: false,
        eventName: '',
        eventStart: '',
        addSignup: false,
        userCharacters: [],
        signupEventId: '',
        signupCharacterId: '',
        signupRoleId: 1,
        signupTentative: false,
        signupLate: false,
        signupNote: ''
    }

    addEventPopout = () => {
        this.setState({ addEvent: true, addSignup: false })
    }

    closeAddEventPopout = () => {
        this.setState({ addEvent: false, addSignup: false })
    }

    updateEventName = (ev) => {
        const eventName = ev.target.value
        this.setState({ eventName })
    }

    updateEventDate = (date) => {
        this.setState({ eventStart: date })
    }

    addEvent = () => {
        const title = this.state.eventName
        const start = Moment(this.state.eventStart).utc().format('YYYY-MM-DD HH:mm:00')

        axios.post('https://professionality-api.com/calendar/add', {
            jwt: Cookies.get('token'),
            title,
            start
        })
        .then(() => {
            this.setState({
                addEvent: false,
                addSignup: false,
                eventName: '',
                eventStart: ''
            })
            this.loadData()
        })
        .catch(err => {
            window.alert('Error adding event, please try re-logging.')
        })
    }

    loadData = () => {
        const user = this.context
        axios.get('https://professionality-api.com/calendar/get', {
            params: {
                discord_user_id: user.discord_user_id || null
            }
        })
        .then(result => {
            const events = result.data
            this.setState({ loading: false, events, loadedWithUser: user.logged_in })
            

            if (user.logged_in) {
                axios.get('https://professionality-api.com/account/get', {
                    params: {
                        discord_user_id: user.discord_user_id
                    }
                })
                .then(result => {
                    this.setState({ userCharacters: result.data.characters })
                })
            }

        })
        .catch(error => {
            window.alert('Issue loading events, please try refreshing the page.')
        })
    }

    addSignupPopout = (ev) => {
        if (this.state.userCharacters.length === 0) {
            window.alert('You need to create a character first. Go to your account page (top right corner, click on your name) and add a character!')
        } else {
            const data = JSON.parse(ev.target.value)
            this.setState({ 
                addEvent: false, 
                addSignup: true,
                signupEventId: data.event_id,
                signupCharacterId: data.character_id || '',
                signupRoleId: data.role_id || 1,
                signupTentative: data.tentative || false,
                signupLate: data.late || false,
                signupNote: data.note || ''
            })
        }
    }

    closeAddSignupPopout = () => {
        this.setState({ 
            addEvent: false, 
            addSignup: false,
            signupEventId: '',
            signupCharacterId: '',
            signupRoleId: 1,
            signupTentative: false,
            signupLate: false,
            signupNote: ''
         })
    }

    updateSignupCharacter = (ev) => {
        const character_id = ev.target.value
        this.setState({ signupCharacterId: character_id })
    }

    updateSignupRole = (ev) => {
        const role_id = ev.target.value
        this.setState({ signupRoleId: role_id })
    }

    updateSignupTentative = (ev) => {
        const checked = ev.target.checked
        this.setState({ signupTentative: checked })
    }

    updateSignupLate = (ev) => {
        const checked = ev.target.checked
        this.setState({ signupLate: checked })
    }

    updateSignupNote = (ev) => {
        const note = ev.target.value
        this.setState({ signupNote: note })
    }

    signup = () => {
        const { signupEventId, signupCharacterId, signupRoleId, signupTentative, signupLate, signupNote } = this.state
        if (signupCharacterId === '') {
            window.alert('Please select a character to sign up with.')
        } else {
            axios.post('https://professionality-api.com/attendance/signup', {
                jwt: Cookies.get('token'),
                event_id: signupEventId,
                character_id: signupCharacterId,
                role_id: signupRoleId,
                tentative: signupTentative,
                late: signupLate,
                note: signupNote
            })
            .then(() => {
                this.setState({ 
                    addEvent: false, 
                    addSignup: false,
                    signupEventId: '',
                    signupCharacterId: '',
                    signupRoleId: 1,
                    signupTentative: false,
                    signupLate: false,
                    signupNote: ''
                })
                this.loadData()
            })
            .catch(err => {
                window.alert('Issue signing up, please try re-logging.')
            })
        }
    }

    callout = (ev) => {
        const event_id = ev.target.value
        axios.post('https://professionality-api.com/attendance/callout', {
            jwt: Cookies.get('token'),
            event_id
        })
        .then(() => {
            this.loadData()
        })
        .catch(err => {
            window.alert('Issue calling out, please try re-logging.')
        })
    }

    cancel = (ev) => {
        const event_id = ev.target.value
        axios.post('https://professionality-api.com/attendance/cancel', {
            jwt: Cookies.get('token'),
            event_id
        })
        .then(() => {
            this.loadData()
        })
        .catch(err => {
            window.alert('Issue canceling, please try re-logging.')
        })
    }

    componentDidUpdate() {
        const user = this.context
        if (user.logged_in && !this.state.loadedWithUser) {
            this.loadData()
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    <Container>
                        <Article>
                            {(this.state.error)
                            ?
                            <p>Error loading data.</p>
                            :
                            (this.state.loading)
                            ?
                            <p>Loading events...</p>
                            :
                            <>
                                {(user.is_officer)
                                ?
                                <AddButton title='Add Event' onClick={this.addEventPopout} />
                                :
                                null
                                }
                                <TableWrapper>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Event</th>
                                                <th title='Casters'><TableIcon src={CasterIcon} /></th>
                                                <th title='Fighters'><TableIcon src={FighterIcon} /></th>
                                                <th title='Healers'><TableIcon src={HealerIcon} /></th>
                                                <th title='Tanks'><TableIcon src={TankIcon} /></th>
                                                <th>Signed Up</th>
                                                <th>Called Out</th>
                                                {(user.logged_in)
                                                ?
                                                <th>Actions</th>
                                                :
                                                null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.events.map(event => (
                                            <tr key={`event_id_${event.id}`}>
                                                <td><NavLink to={`/event/${event.id}`}>{Moment(event.start).format('ddd M/D @ h:mm a')}</NavLink></td>
                                                <td><NavLink to={`/event/${event.id}`}>{event.title}</NavLink></td>
                                                <td>{event.total_casters}</td>
                                                <td>{event.total_fighters}</td>
                                                <td>{event.total_healers}</td>
                                                <td>{event.total_tanks}</td>
                                                <td>{event.total_sign_ups}</td>
                                                <td>{event.total_call_outs}</td>
                                                {(user.logged_in && new Date(event.start) > new Date())
                                                ?
                                                <td>
                                                    <TableButtonWrapper>
                                                        <TableButton title='Sign Up' value={JSON.stringify({event_id: event.id, character_id: event.character_id, role_id: event.role_id, tentative: event.tentative, late: event.late, note: event.note })} onClick={this.addSignupPopout} active={(event.signed_up)?true:false} />
                                                        <TableButton title='Call Out' value={event.id} onClick={this.callout} disabled={(event.called_out)?true:false} active={(event.called_out)?true:false} />
                                                        <TableButton title='Cancel' value={event.id} onClick={this.cancel} disabled={(event.signed_up || event.called_out)?false:true} />
                                                    </TableButtonWrapper>
                                                </td>
                                                :
                                                null
                                                }
                                            </tr>
                                            )))}            
                                        </tbody>
                                    </Table>
                                </TableWrapper>
                            </>
                            }
                        </Article>
                        {(this.state.addEvent)
                        ?
                        <Popout>
                            <h4>Add Event</h4>
                            <AddEventTime
                                selected={this.state.eventStart}
                                onChange={this.updateEventDate}
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={30}
                                timeCaption='Time'
                                dateFormat='MMMM d, yyyy h:mm aa'
                            />
                            <AddEventName type='text' placeholder='Event Name' value={this.state.eventName} onChange={this.updateEventName} />
                            <div>
                                <SubmitButton onClick={this.addEvent}>Add</SubmitButton>
                                <CancelButton onClick={this.closeAddEventPopout}>Cancel</CancelButton>
                            </div>
                        </Popout>
                        :
                        null
                        }
                        {(this.state.addSignup)
                        ?
                        <Popout>
                            <h4>Sign Up</h4>
                            <CharacterSelect value={this.state.signupCharacterId} onChange={this.updateSignupCharacter}>
                                <option></option>
                                {(this.state.userCharacters.map(character => <option key={`user_character_id_${character.id}`} value={character.id}>{character.name}</option> ))}
                            </CharacterSelect>
                            <RoleSelect value={this.state.signupRoleId} onChange={this.updateSignupRole}>
                                <option value={1}>Caster</option>
                                <option value={2}>Fighter</option>
                                <option value={3}>Healer</option>
                                <option value={4}>Tank</option>
                            </RoleSelect>
                            <CheckboxContainer>
                                <CheckboxTitle>Tentative:</CheckboxTitle>
                                <Checkbox type='checkbox' checked={(this.state.signupTentative)?true:false} onChange={this.updateSignupTentative} />
                                <Checkmark />
                            </CheckboxContainer>
                            <CheckboxContainer>
                                <CheckboxTitle>Late:</CheckboxTitle>
                                <Checkbox type='checkbox' checked={(this.state.signupLate)?true:false} onChange={this.updateSignupLate} />
                                <Checkmark />
                            </CheckboxContainer>
                            <NoteField type='text' value={this.state.signupNote} onChange={this.updateSignupNote} placeholder='Note' />
                            <div>
                                <SubmitButton onClick={this.signup}>Sign Up</SubmitButton>
                                <CancelButton onClick={this.closeAddSignupPopout}>Cancel</CancelButton>
                            </div>

                        </Popout>
                        :
                        null
                        }
                    </Container>
                )}
            </UserContext.Consumer>
        )
    }   
}

Events.contextType = UserContext
export default Events
