import React from 'react'
import styled from 'styled-components'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import { getUsers } from '../../services/roster'
import { updateEvent } from '../../services/event'
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const RaidLeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const UserSelect = styled.select`
    padding: 5px;
    font-size: 16px;
    margin: 5px;
    box-sizing: border-box;
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

class UpdateEvent extends React.Component {
    state = {
        active: false,
        updating: false,
        users: [],
        eventName: this.props.data.title,
        eventStart: new Date(this.props.data.start),
        eventIsPrimary: this.props.data.primary_raid,
        eventRaidLeader: this.props.data.raid_leader
    }
    
    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ 
            active: false
        })
    }

    updateEventName = (ev) => {
        const eventName = ev.target.value
        this.setState({ eventName })
    }

    updateEventDate = (date) => {
        this.setState({ eventStart: date })
        console.log(this.state)
    }

    updateEventPrimary = (ev) => {
        const checked = ev.target.checked
        this.setState({ eventIsPrimary: checked })
    }

    updateEventRaidLeader = (ev) => {
        const eventRaidLeader = ev.target.value
        this.setState({ eventRaidLeader })
    }

    loadData = () => {
        this.setState({ updating: true })
        getUsers()
        .then(result => {
            this.setState({
                users: result
            })
            this.setState({ updating: false })
        })
        .catch(err => {
            window.alert('Error loading event, please try re-logging.')
            this.setState({ updating: false })
        })
    }

    update = () => {
        this.setState({ updating: true })
        const title = this.state.eventName
        const start = Moment(this.state.eventStart).utc().format('YYYY-MM-DD HH:mm:00')
        const primary = this.state.eventIsPrimary
        let raid_leader = this.state.eventRaidLeader
        if (raid_leader === '') {
            raid_leader = null
        }

        if (title.length > 1 && this.state.eventStart !== '') {
            updateEvent(this.props.data.id, title, start, primary, raid_leader)
            .then(() => {
                this.setState({
                    active: false,
                    updating: false
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error updating event, please try re-logging.')
                this.setState({ updating: false })
            })
        } else {
            window.alert('Please enter a valid date and event title.')
            this.setState({ updating: false })
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <>
                <AddButton title='Update Event' onClick={this.open} disabled={this.state.updating} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.update} cancelFunction={this.close} disabled={this.state.updating}>
                    <h4>Update Event</h4>
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
                    <RaidLeaderContainer>
                        <Span>Raid Leader</Span>
                        <UserSelect value={this.state.eventRaidLeader} onChange={this.updateEventRaidLeader} placeholder='Raid Leader'>
                            <option></option>
                            {this.state.users.map(u => <option key={`user_${u.discord_user_id}`} value={u.discord_user_id}>{u.nickname}</option> )}
                        </UserSelect>
                    </RaidLeaderContainer>
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

export default UpdateEvent
