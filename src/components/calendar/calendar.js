import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import Cookies from 'js-cookie'
import UserContext from '../../context/user'
import Article from '../article'
import AddButton from '../addButton'
import TableButton from '../tableButton'
import Popout from '../popout'

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
        axios.get('https://professionality-api.com/calendar/get')
        .then(result => {
            const events = result.data
            this.setState({ loading: false, events })
        })
        .catch(error => {
            window.alert('Issue loading events, please try refreshing the page.')
        })
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
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Event</th>
                                            <th title='Casters'>C</th>
                                            <th title='Fighters'>F</th>
                                            <th title='Healers'>H</th>
                                            <th title='Tanks'>T</th>
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
                                                <TableButton title='Sign Up' />
                                                <TableButton title='Call Out' />
                                                <TableButton title='Cancel' />
                                            </td>
                                            :
                                            null
                                            }
                                        </tr>
                                        )))}            
                                    </tbody>
                                </Table>
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

export default Calendar
