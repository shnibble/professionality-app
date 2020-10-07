import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment'
import Article from '../article'
import TableWrapper from '../tableWrapper'
import CasterIcon from '../../images/caster.png'
import FighterIcon from '../../images/fighter.png'
import HealerIcon from '../../images/healer.png'
import TankIcon from '../../images/tank.png'

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
        background: ${props => props.theme.colors.tableOddRowBackground};
    }

    & tbody td:nth-child(2) { 
        min-width: 100px;
    }

    & th:nth-child(4), & th:nth-child(5), & th:nth-child(6), & th:nth-child(7), & th:nth-child(8), & th:nth-child(9),
    & td:nth-child(4), & td:nth-child(5), & td:nth-child(6), & td:nth-child(7), & td:nth-child(8), & td:nth-child(9) {
        display: none;
    }

    @media screen and (min-width: 720px) {
        & th:nth-child(4), & th:nth-child(5), & th:nth-child(6), & th:nth-child(7), & th:nth-child(8), & th:nth-child(9),
        & td:nth-child(4), & td:nth-child(5), & td:nth-child(6), & td:nth-child(7), & td:nth-child(8), & td:nth-child(9) {
            display: table-cell;
        }
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
    color: ${props => props.theme.colors.buttonColor};
    border: none;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: ${props => props.theme.colors.highlight};
    }

    &:disabled {
        cursor: default;
        color: ${props => props.theme.colors.disabledColor};
    }
`
const PagerText = styled.span`
    color: ${props => props.theme.colors.lowlight};
`
const StyledNavLink = styled(NavLink)`
    color: ${props => props.theme.colors.anchor};
`

class PastEvents extends React.Component {
    state = {
        error: false,
        loading: true,
        events: [],
        limit: 20,
        offset: 0,
        count: 0
    }

    loadData = () => {
        axios.get('https://professionality-api.com/calendar/past', {
            params: {
                limit: this.state.limit,
                offset: this.state.offset
            }
        })
        .then(result => {

            axios.get('https://professionality-api.com/calendar/past')
            .then(total_results => {
                const count = total_results.data.length
                const events = result.data
                this.setState({ loading: false, events, count })
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
                                        <th></th>
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
                                        <td>{(event.primary_raid)?'Primary':''}</td>
                                        <td><StyledNavLink to={`/event/${event.id}`}>{Moment(event.start).format('ddd M/D @ h:mm a')}</StyledNavLink></td>
                                        <td><StyledNavLink to={`/event/${event.id}`}>{event.title}</StyledNavLink></td>
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
                        <Pager>
                            <PagerButton onClick={this.previousPage} disabled={(this.state.offset === 0)?true:false}>Previous</PagerButton>
                            <PagerText>{min} - {max} of {this.state.count}</PagerText>
                            <PagerButton onClick={this.nextPage} disabled={(this.state.offset >= this.state.count - this.state.limit)?true:false}>Next</PagerButton>
                        </Pager>
                    </>
                    }
                </Article>
            </Container>
        )
    }   
}

export default PastEvents
