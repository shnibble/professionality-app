import React from 'react'
import styled from 'styled-components'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import { addEvent } from '../../services/event'
import Popout from '../popout'
import AddButton from '../addButton'

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
const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const Span = styled.span`
    display: block;
    margin: 5px;
`
const Checkbox = styled.input`
    margin: 5px;
    height: 30px;
    width: 30px;
    cursor: pointer;
`

class AddEvent extends React.Component {
    state = {
        active: false,
        updating: false,
        eventName: '',
        eventStart: '',
        eventIsPrimary: false,
    }
    
    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ 
            active: false,
            updating: false,
            eventName: '',
            eventStart: '',
            eventIsPrimary: false,
        })
    }

    updateEventName = (ev) => {
        const eventName = ev.target.value
        this.setState({ eventName })
    }

    updateEventDate = (date) => {
        this.setState({ eventStart: date })
    }

    updateEventPrimary = (ev) => {
        const checked = ev.target.checked
        this.setState({ eventIsPrimary: checked })
    }

    add = () => {
        this.setState({ updating: true })
        const title = this.state.eventName
        const start = Moment(this.state.eventStart).utc().format('YYYY-MM-DD HH:mm:00')
        const primary = this.state.eventIsPrimary

        if (title.length > 1 && this.state.eventStart !== '') {
            addEvent(title, start, primary)
            .then(() => {
                this.setState({
                    active: false,
                    updating: false,
                    eventName: '',
                    eventStart: '',
                    eventIsPrimary: false,
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding event, please try re-logging.')
                this.setState({ updating: false })
            })
        } else {
            window.alert('Please enter a valid date and event title.')
            this.setState({ updating: false })
        }
    }

    render() {
        return (
            <>
                <AddButton title='Add Event' onClick={this.open} disabled={this.state.updating} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.add} cancelFunction={this.close} disabled={this.state.updating}>
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
                    <CheckboxContainer>
                        <Span>Primary Raid?</Span>
                        <Checkbox type='checkbox' checked={this.state.eventIsPrimary} onChange={this.updateEventPrimary} />
                    </CheckboxContainer>
                </Popout>
                :
                null
                }
            </>
        )
    }
}

export default AddEvent
