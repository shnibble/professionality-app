import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment'
import styled from 'styled-components'
import UserContext from '../../context/user'
import Article from '../article'
import TableWrapper from '../tableWrapper'
import CasterIcon from '../../images/caster.png'
import FighterIcon from '../../images/fighter.png'
import HealerIcon from '../../images/healer.png'
import TankIcon from '../../images/tank.png'
import TentativeImg from '../../images/tentative.png'
import LateImg from '../../images/late.png'
import TableButtonWrapper from '../tableButtonWrapper'
import Cookies from 'js-cookie'
import AttendanceBreakdown from './attendanceBreakdown'
import Bench from './bench'
import AttendanceModule from './attendanceModule'

const AttendanceTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 10px;

    & tr > th, & tr > td {
        padding: 5px;
    }

    & tbody > tr:nth-child(odd) {
        background: ${props => props.theme.colors.tableOddRowBackground};
    }

    & tbody td:nth-child(1) { 
        min-width: 100px;
    }
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
    margin: 1px;
    width: 30px;
    height: 30px;
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
const SignupTypeTd = styled.td`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const TableIcon = styled.img`
    width: 20px;
    height: 20px;
    margin: 2px;
`
const TimestampColumn = styled.td`
    &.late {
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
        event: {}
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
        })
        .catch(err => {
            window.alert('Error loading event, please try refreshing the page.')
            this.setState({ error: true, loading: false })
        })
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
                                <AttendanceBreakdown event={this.state.event} loadDataFunction={this.loadData} user={user} />
                            </Article>

                            <Article>
                                <h3>Bench</h3>
                                <Bench event={this.state.event} loadDataFunction={this.loadData} user={user} />
                            </Article>

                            <Article>
                                <h3>Attendance</h3>
                                {(user.logged_in && new Date(this.state.event.start) > new Date())
                                ?
                                <AttendanceModule event={this.state.event} loadDataFunction={this.loadData} />
                                :
                                null
                                }
                                <TableWrapper>
                                    <AttendanceTable>
                                        <thead>
                                            <tr>
                                                <th>Timestamp</th>
                                                <th>Updated</th>
                                                <th>User</th>
                                                <th>Type</th>
                                                <th>Character</th>
                                                <th>Role</th>
                                                <th>Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.event.attendance.map(attendance => {
                                                
                                                const created = Moment(attendance.created)
                                                const eventDate = Moment(this.state.event.start)



                                                return (
                                                    <tr key={`event_attendance_id_${attendance.id}`}>
                                                        <TimestampColumn className={(eventDate.diff(created, 'days') < 3)?'late':''}>{Moment(attendance.created).format('MM/DD/YYYY HH:mm:ss')}</TimestampColumn>
                                                        <td>{Moment((attendance.signed_up)?attendance.signed_up:attendance.called_out).format('MM/DD/YYYY HH:mm:ss')}</td>
                                                        <td>{attendance.nickname}</td>
                                                        <SignupTypeTd>
                                                            {(attendance.signed_up)?'Sign Up':'Call Out'}
                                                            {(attendance.tentative)
                                                            ?
                                                            <TableIcon title='Tentative' src={TentativeImg} />
                                                            :
                                                            null
                                                            }
                                                            {(attendance.late)
                                                            ?
                                                            <TableIcon title='Late' src={LateImg} />
                                                            :
                                                            null
                                                            }
                                                        </SignupTypeTd>
                                                        <td>{(attendance.character_name)?<TableCharacter className={`class-${attendance.character_class_id}`}>{attendance.character_name}</TableCharacter>:'-'}</td>
                                                        <td>{(attendance.role_id)?<TableRole className={`role-${attendance.role_id}`} />:'-'}</td>
                                                        <td>{attendance.note}</td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                    </AttendanceTable>
                                </TableWrapper>
                            </Article>
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
