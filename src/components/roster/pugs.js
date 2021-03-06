import React from 'react'
import styled from 'styled-components'
import { getPugs } from '../../services/roster'
import TableWrapper from '../tableWrapper'
import Table from './table'
import Character from './character'
import DiscordLink from './discordLink'
import Article from '../article'
import CheckBoxTrueImg from '../../images/checkbox-true.png'
import CheckBoxFalseImg from '../../images/checkbox-false.png'

const AvailabilityTable = styled.table`
    font-size: 10px;

    & thead th {
        padding: 1px;
    }
    & tbody td {
        padding: 1px;
    }
    & tbody tr:nth-child(odd) {
        background: none;
    }
`
const Checkbox = styled.img`
    width: 15px;
    height: 15px;
    margin: 1px;
`

class Pugs extends React.Component {
    state = {
        users: []
    }
    
    loadData = () => {
        getPugs()
        .then(results => {
            this.setState({ users: results })
        })
    }
    
    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <Article>
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Discord</th>
                                <th>Characters</th>
                                <th>Attendance</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.users.map(user => (
                                <tr key={user.discord_user_id}>
                                    <td>{user.nickname}</td>
                                    <td><DiscordLink data={user} /></td>
                                    <td>
                                        {user.characters.map(character => <Character key={`character_id_${character.id}`} data={character} /> )}
                                    </td>
                                    <td>{(Number(user.attendance)/5)*100}%</td>
                                    <td>
                                        <AvailabilityTable>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>MON</th>
                                                    <th>TUE</th>
                                                    <th>WED</th>
                                                    <th>THU</th>
                                                    <th>FRI</th>
                                                    <th>SAT</th>
                                                    <th>SUN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Day:</td>
                                                    <td><Checkbox src={(user.monday_morning)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.tuesday_morning)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.wednesday_morning)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.thursday_morning)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.friday_morning)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.saturday_morning)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.sunday_morning)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Evening:</td>
                                                    <td><Checkbox src={(user.monday_evening)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.tuesday_evening)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.wednesday_evening)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.thursday_evening)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.friday_evening)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.saturday_evening)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                    <td><Checkbox src={(user.sunday_evening)?CheckBoxTrueImg:CheckBoxFalseImg} /></td>
                                                </tr>
                                            </tbody>
                                        </AvailabilityTable>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </Article>
        )
    }
}

export default Pugs
