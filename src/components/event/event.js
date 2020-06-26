import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment'
import styled from 'styled-components'
import UserContext from '../../context/user'
import Article from '../article'
import TableWrapper from '../tableWrapper'
import CasterIcon from '../../images/spell_fire_firebolt02.jpg'
import FighterIcon from '../../images/ability_warrior_challange.jpg'
import HealerIcon from '../../images/spell_holy_flashheal.jpg'
import TankIcon from '../../images/ability_warrior_defensivestance.jpg'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'
import TableButtonWrapper from '../tableButtonWrapper'
import TableButton from '../tableButton'
import Popout from '../popout'
import Cookies from 'js-cookie'

const DetailsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 10px;
`
const TableIcon = styled.img`
    width: 20px;
    height: 20px;
`
const AttendanceTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 10px;

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
const TableCheckbox = styled.img`
    width: 30px;
    height: 30px;
`
const TableCharacter = styled.span`
    display: inline-block;
    margin: 2px;
    padding: 2px;
    border-radius: 4px;
    text-align: center;
    background: #202020;
    border: 1px solid #606060;

    &.class-1 {
        color: #C79C6E;
    }
    &.class-2 {
        color: #F58CBA;
    }
    &.class-3 {
        color: #ABD473;
    }
    &.class-4 {
        color: #FFF569;
    }
    &.class-5 {
        color: #FFFFFF;
    }
    &.class-8 {
        color: #69CCF0;
    }
    &.class-9 {
        color: #9482C9;
    }
    &.class-11 {
        color: #FF7D0A;
    }
`
const TableRole = styled.div`
    display: inline-block;
    margin: 2px;
    width: 20px;
    height: 20px;
    background-size: 100%;
    
    &.role-1 {
        background-image: url(${CasterIcon})
    }    
    &.role-2 {
        background-image: url(${FighterIcon})
    }    
    &.role-3 {
        background-image: url(${HealerIcon})
    }    
    &.role-4 {
        background-image: url(${TankIcon})
    }
`
const DeleteEventButton = styled.button`
    display: inline-block;
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 2px;
    margin: 2px;
    border-radius: 4px;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
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

class Event extends React.Component {
    state = {
        event_id: this.props.match.params.id,
        loading: true,
        loadedWithUser: false,
        eventDeleted: false,
        error: false,
        event: {},
        addSignup: false,
        userCharacters: [],
        signupCharacterId: '',
        signupRoleId: 1,
        signupTentative: false,
        signupLate: false,
        signupNote: ''
    }

    loadData = () => {
        const user = this.context
        axios.get('https://professionality-api.com/event/get', {
            params: {
                event_id: this.state.event_id,
                discord_user_id: user.discord_user_id || null
            }
        })
        .then(result => {
            this.setState({ loading: false, event: result.data, loadedWithUser: user.logged_in })

            if (user.logged_in) {
                axios.get('https://professionality-api.com/account/get', {
                    params: {
                        discord_user_id: user.discord_user_id
                    }
                })
                .then(result => {
                    this.setState({ userCharacters: result.data.characters })
                })
                .catch(err => {
                    this.setState({ error: true, loading: false })
                })
            }
        })
        .catch(err => {
            window.alert('Error loading event, please try refreshing the page.')
            this.setState({ error: true, loading: false })
        })
    }

    addSignupPopout = () => {
        this.setState({ 
            addSignup: true,
            signupCharacterId: this.state.event.character_id,
            signupRoleId: this.state.event.role_id,
            signupTentative: this.state.event.tentative,
            signupLate: this.state.event.late,
            signupNote: this.state.event.note
        })
    }

    closeAddSignupPopout = () => {
        this.setState({ addSignup: false })
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


    deleteEvent = () => {
        const event_id = this.state.event.id
        if (window.confirm('Are you sure you want to delete this event?')) {
            axios.post('https://professionality-api.com/calendar/delete', {
                jwt: Cookies.get('token'),
                event_id
            })
            .then(() => {
                this.setState({ eventDeleted: true })
            })
            .catch(err => {
                window.alert('Error deleting event, please try re-logging.')
            })
        }
    }

    signup = () => {
        const { event_id, signupCharacterId, signupRoleId, signupTentative, signupLate, signupNote } = this.state
        if (signupCharacterId === '') {
            window.alert('Please select a character to sign up with.')
        } else {
            axios.post('https://professionality-api.com/attendance/signup', {
                jwt: Cookies.get('token'),
                event_id: event_id,
                character_id: signupCharacterId,
                role_id: signupRoleId,
                tentative: signupTentative,
                late: signupLate,
                note: signupNote
            })
            .then(() => {
                this.setState({ 
                    addSignup: false
                })
                this.loadData()
            })
            .catch(err => {
                window.alert('Issue signing up, please try re-logging.')
            })
        }
    }

    callout = () => {
        const event_id = this.state.event.id
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

    cancel = () => {
        const event_id = this.state.event.id
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
                    <>
                        {(this.state.eventDeleted)
                        ?
                        <Redirect to='/calendar' />
                        :
                        (this.state.error)
                        ?
                        <Article>
                            <p>Error loading event.</p>
                        </Article>
                        :
                        (this.state.loading)
                        ?
                        <Article>
                            <p>Loading event...</p>
                        </Article>
                        :
                        <>
                            <h2>{Moment(this.state.event.start).format('ddd M/D @ h:mm a')} - {this.state.event.title}</h2>
                            <Article>
                                <h3>Details</h3>
                                {(user.is_officer)
                                ?
                                <TableButtonWrapper>
                                    <DeleteEventButton onClick={this.deleteEvent}>Delete Event</DeleteEventButton>
                                </TableButtonWrapper>
                                :
                                null
                                }
                                <TableWrapper>
                                    <DetailsTable>
                                        <thead>
                                            <tr>
                                                <th title='Casters'><TableIcon src={CasterIcon} /></th>
                                                <th title='Fighters'><TableIcon src={FighterIcon} /></th>
                                                <th title='Healers'><TableIcon src={HealerIcon} /></th>
                                                <th title='Tanks'><TableIcon src={TankIcon} /></th>
                                                <th>Total</th>
                                                <th>Call Outs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.event.total_casters}</td>
                                                <td>{this.state.event.total_fighters}</td>
                                                <td>{this.state.event.total_healers}</td>
                                                <td>{this.state.event.total_tanks}</td>
                                                <td>{this.state.event.total_sign_ups}</td>
                                                <td>{this.state.event.total_call_outs}</td>
                                            </tr>
                                        </tbody>
                                    </DetailsTable>
                                </TableWrapper>
                            </Article>

                            <Article>
                                <h3>Attendance</h3>
                                {(user.logged_in && new Date(this.state.event.start) > new Date())
                                ?
                                <TableButtonWrapper>
                                    <TableButton title='Sign Up' onClick={this.addSignupPopout} active={(this.state.event.signed_up)?true:false} />
                                    <TableButton title='Call Out' onClick={this.callout} disabled={(this.state.event.called_out)?true:false} active={(this.state.event.called_out)?true:false} />
                                    <TableButton title='Cancel' onClick={this.cancel} disabled={(this.state.event.signed_up || this.state.event.called_out)?false:true} />
                                </TableButtonWrapper>
                                :
                                null
                                }
                                <TableWrapper>
                                    <AttendanceTable>
                                        <thead>
                                            <tr>
                                                <th>Timestamp</th>
                                                <th>User</th>
                                                <th>Type</th>
                                                <th>Tentative</th>
                                                <th>Late</th>
                                                <th>Character</th>
                                                <th>Role</th>
                                                <th>Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.event.attendance.map(attendance => (
                                                <tr key={`event_attendance_id_${attendance.id}`}>
                                                    <td>{Moment((attendance.signed_up)?attendance.signed_up:attendance.called_out).format('MM/DD/YYYY HH:mm:ss')}</td>
                                                    <td>{attendance.nickname}</td>
                                                    <td>{(attendance.signed_up)?'Sign Up':'Call Out'}</td>
                                                    <td><TableCheckbox src={(attendance.tentative)?CheckboxTrueImg:CheckboxFalseImg} /></td>
                                                    <td><TableCheckbox src={(attendance.late)?CheckboxTrueImg:CheckboxFalseImg} /></td>
                                                    <td>{(attendance.character_name)?<TableCharacter className={`class-${attendance.character_class_id}`}>{attendance.character_name}</TableCharacter>:'-'}</td>
                                                    <td>{(attendance.role_id)?<TableRole className={`role-${attendance.role_id}`} />:'-'}</td>
                                                    <td>{attendance.note}</td>
                                                </tr>
                                            )))}
                                        </tbody>
                                    </AttendanceTable>
                                </TableWrapper>
                            </Article>
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
                        </>
                        }
                    </>
                )}
            </UserContext.Consumer>
        )
    }
}

Event.contextType = UserContext
export default Event
