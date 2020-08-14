import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment'
import UserContext from '../../context/user'
import Article from '../article'
import TableWrapper from '../tableWrapper'
import CasterIcon from '../../images/caster.png'
import FighterIcon from '../../images/fighter.png'
import HealerIcon from '../../images/healer.png'
import TankIcon from '../../images/tank.png'
import AttendanceModule from './attendanceModule'
import AddEvent from './addEvent'

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
    width: 30px;
    height: 30px;
`
const Pager = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
const PagerButton = styled.button`
    background: none;
    padding: 5px 15px;
    color: #999;
    border: none;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: #f88000;
    }

    &:disabled {
        cursor: default;
        color: #f2f2f2;
    }
`
const PagerText = styled.span`
    color: #999;
`

class Events extends React.Component {
    state = {
        error: false,
        loading: true,
        loadedWithUser: false,
        events: [],
        limit: 20,
        offset: 0,
        count: 0
    }

    loadData = () => {
        const user = this.context
        axios.get('https://professionality-api.com/calendar/get', {
            params: {
                discord_user_id: user.discord_user_id || null,
                limit: this.state.limit,
                offset: this.state.offset
            }
        })
        .then(result => {

            axios.get('https://professionality-api.com/calendar/get', {
                params: {
                    discord_user_id: user.discord_user_id || null
                }
            })
            .then(total_results => {
                const count = total_results.data.length
                const events = result.data
                this.setState({ loading: false, events, loadedWithUser: user.logged_in, count })
            })
        })
        .catch(error => {
            window.alert('Issue loading events, please try refreshing the page.')
        })
    }

    previousPage = async () => {
        let offset = this.state.offset - this.state.limit
        if (offset < 0) {
            offset = 0
        }
        await this.setState({ offset })
        this.loadData()
    }

    nextPage = async () => {
        let offset = this.state.offset + this.state.limit
        if (offset < this.state.count) {
            await this.setState({ offset: this.state.offset + this.state.limit })
            this.loadData()
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
        let min = this.state.offset + 1
        let max = this.state.offset + this.state.limit
        if (max > this.state.count) {
            max = this.state.count
        }

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
                                <AddEvent loadDataFunction={this.loadData} />
                                :
                                null
                                }
                                <>
                                    <Pager>
                                        <PagerButton onClick={this.previousPage} disabled={(this.state.offset === 0)?true:false}>Previous</PagerButton>
                                        <PagerText>{min} - {max} of {this.state.count}</PagerText>
                                        <PagerButton onClick={this.nextPage} disabled={(this.state.offset >= this.state.count - this.state.limit)?true:false}>Next</PagerButton>
                                    </Pager>
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
                                                        <AttendanceModule event={event} loadDataFunction={this.loadData} />
                                                    </td>
                                                    :
                                                    null
                                                    }
                                                </tr>
                                                )))}            
                                            </tbody>
                                        </Table>
                                    </TableWrapper>
                                    <Pager>
                                        <PagerButton onClick={this.previousPage} disabled={(this.state.offset === 0)?true:false}>Previous</PagerButton>
                                        <PagerText>{min} - {max} of {this.state.count}</PagerText>
                                        <PagerButton onClick={this.nextPage} disabled={(this.state.offset >= this.state.count - this.state.limit)?true:false}>Next</PagerButton>
                                    </Pager>
                                </>
                            </>
                            }
                        </Article>
                    </Container>
                )}
            </UserContext.Consumer>
        )
    }   
}

Events.contextType = UserContext
export default Events
