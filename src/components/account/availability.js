import React from 'react'
import styled from 'styled-components'
import { updateAvailability } from '../../services/availability'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'
import TableWrapper from '../tableWrapper'

const Container = styled.div`

`
const Table = styled.table`
    text-align: center;

    & th {
        font-weight: bold;
        font-size: 14px;
        padding: 2px;
    }
    & tbody td {
        padding: 5px;
    }
    & td:nth-child(1) {
        text-align: right;
    }
`
const CheckboxContainer = styled.label`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 4px;

    &:hover {
        background: #606060;
    }
`
const Checkbox = styled.input`
    display: none;

    &:checked + div {
        background-image: url(${CheckboxTrueImg});
    }
`
const Checkmark = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-image: url(${CheckboxFalseImg});
    background-size: 100%;
`

class Availability extends React.Component {

    handleUpdateAvailability = (ev) => {
        const timeframe = ev.target.name
        const available = ev.target.checked

        updateAvailability(timeframe, available)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Issue updating availablity, please try re-logging.')
        })
    }

    render() {
        return (
            <Container>
                <TableWrapper>
                    <Table>
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
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.monday_morning} name='monday_morning' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.tuesday_morning} name='tuesday_morning' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.wednesday_morning} name='wednesday_morning' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.thursday_morning} name='thursday_morning' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.friday_morning} name='friday_morning' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.saturday_morning} name='saturday_morning' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.sunday_morning} name='sunday_morning' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                            </tr>
                            <tr>
                                <td>Evening:</td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.monday_evening} name='monday_evening' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.tuesday_evening} name='tuesday_evening' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.wednesday_evening} name='wednesday_evening' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.thursday_evening} name='thursday_evening' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.friday_evening} name='friday_evening' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.saturday_evening} name='saturday_evening' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                                <td>
                                    <CheckboxContainer>
                                        <Checkbox type='checkbox' checked={this.props.data.sunday_evening} name='sunday_evening' onChange={this.handleUpdateAvailability} />
                                        <Checkmark />
                                    </CheckboxContainer>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </TableWrapper>
            </Container>
        )
    }
}

export default Availability

