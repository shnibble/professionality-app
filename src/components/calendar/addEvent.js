import React from 'react'
import styled from 'styled-components'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import { addEvent } from '../../services/event'
import Popout from '../popout'
import AddButton from '../addButton'
import SubmitButton from '../submitButton'
import CancelButton from '../cancelButton'

const Field = styled.input`
    display: inline-block;
    width: 100%;
    max-width: 245px;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const AddEventTime = styled(DatePicker)`
    font-size: 20px;
    padding: 15px;
    margin: 10px;
    text-align: center;
`

class AddEvent extends React.Component {
    state = {
        active: false,
        processing: false,
        eventName: '',
        eventStart: '',
    }
    
    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ 
            active: false,
            processing: false,
            eventName: '',
            eventStart: '',
        })
    }

    updateEventName = (ev) => {
        const eventName = ev.target.value
        this.setState({ eventName })
    }

    updateEventDate = (date) => {
        this.setState({ eventStart: date })
    }

    add = () => {
        this.setState({ processing: true })
        const title = this.state.eventName
        const start = Moment(this.state.eventStart).utc().format('YYYY-MM-DD HH:mm:00')

        if (title.length > 1 && this.state.eventStart !== '') {
            addEvent(title, start)
            .then(() => {
                this.setState({
                    active: false,
                    processing: false,
                    eventName: '',
                    eventStart: ''
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding event, please try re-logging.')
                this.setState({ processing: false })
            })
        } else {
            window.alert('Please enter a valid date and event title.')
            this.setState({ processing: false })
        }
    }

    render() {
        return (
            <>
                <AddButton title='Add Event' onClick={this.open} />
                {(this.state.active)
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
                    <Field type='text' placeholder='Event Name' value={this.state.eventName} onChange={this.updateEventName} />
                    <div>
                        <SubmitButton title='Add' onClick={this.add} disabled={this.state.processing} />
                        <CancelButton title='Cancel' onClick={this.close} />
                    </div>
                </Popout>
                :
                null
                }
            </>
        )
    }
}

export default AddEvent
