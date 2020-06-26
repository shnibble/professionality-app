import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment'
import Article from '../article'
import TableWrapper from '../tableWrapper'
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

class PastEvents extends React.Component {
    state = {
        error: false,
        loading: true,
        events: [],
    }

    loadData = () => {
        axios.get('https://professionality-api.com/calendar/past')
        .then(result => {
            const events = result.data
            this.setState({ loading: false, events })
        })
        .catch(error => {
            window.alert('Issue loading events, please try refreshing the page.')
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <Container>
                <Article>
                    {(this.state.error)
                    ?
                    <p>Error loading data.</p>
                    :
                    (this.state.loading)
                    ?
                    <p>Loading past events...</p>
                    :
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
                                </tr>
                                )))}            
                            </tbody>
                        </Table>
                    </TableWrapper>
                    }
                </Article>
            </Container>
        )
    }   
}

export default PastEvents
