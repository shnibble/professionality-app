import React from 'react'
import styled from 'styled-components'
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
const AddEventAddButton = styled.button`
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
const AddEventCancelButton = styled.button`
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

class Calendar extends React.Component {
    state = {
        error: false,
        loading: true,
        loadedWithUser: false,
        events: [],
        addEvent: false,
        eventName: '',
        eventStart: ''
    }

    addEventPopout = () => {
        this.setState({ addEvent: true })
    }

    closeAddEventPopout = () => {
        this.setState({ addEvent: false })
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
                eventName: '',
                eventStart: ''
            })
            this.loadEvents()
        })
        .catch(err => {
            window.alert('Error adding event, please try re-logging.')
        })
    }

    loadEvents = () => {
        const user = this.context
        axios.get('https://professionality-api.com/calendar/get', {
            params: {
                discord_user_id: user.discord_user_id || null
            }
        })
        .then(result => {
            const events = result.data
            this.setState({ loading: false, events, loadedWithUser: user.logged_in })
        })
        .catch(error => {
            window.alert('Issue loading events, please try refreshing the page.')
        })
    }

    callout = (ev) => {
        const event_id = ev.target.value
        axios.post('https://professionality-api.com/attendance/callout', {
            jwt: Cookies.get('token'),
            event_id
        })
        .then(() => {
            this.loadEvents()
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
            this.loadEvents()
        })
        .catch(err => {
            window.alert('Issue canceling, please try re-logging.')
        })
    }

    componentDidUpdate() {
        const user = this.context
        if (user.logged_in && !this.state.loadedWithUser) {
            this.loadEvents()
        }
    }

    componentDidMount() {
        this.loadEvents()
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    <Container>
                        <h2>Calendar</h2>
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
                                                <td>{Moment(event.start).format('ddd M/D @ h:mm a')}</td>
                                                <td>{event.title}</td>
                                                <td>{event.total_casters}</td>
                                                <td>{event.total_fighters}</td>
                                                <td>{event.total_healers}</td>
                                                <td>{event.total_tanks}</td>
                                                <td>{event.total_sign_ups}</td>
                                                <td>{event.total_call_outs}</td>
                                                {(user.logged_in)
                                                ?
                                                <td>
                                                    <TableButtonWrapper>
                                                        <TableButton title='Sign Up' disabled={(event.signed_up)?true:false} active={(event.signed_up)?true:false} />
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
                                <AddEventAddButton onClick={this.addEvent}>Add</AddEventAddButton>
                                <AddEventCancelButton onClick={this.closeAddEventPopout}>Cancel</AddEventCancelButton>
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

Calendar.contextType = UserContext
export default Calendar
