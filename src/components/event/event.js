import React from 'react'
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

class Event extends React.Component {
    state = {
        event_id: this.props.match.params.id,
        loading: true,
        error: false,
        event: {}
    }

    loadData = () => {
        axios.get('https://professionality-api.com/event/get', {
            params: {
                event_id: this.state.event_id
            }
        })
        .then(result => {
            this.setState({ loading: false, event: result.data })
        })
        .catch(err => {
            window.alert('Error loading event, please try refreshing the page.')
            this.setState({ error: true, loading: false })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    <>
                        {(this.state.error)
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
                        </>
                        }
                    </>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Event
