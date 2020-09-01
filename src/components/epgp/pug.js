import React from 'react'
import styled from 'styled-components'
import Moment from 'moment'
import {
    activateCharacter,
    deactivateCharacter,
    deleteCharacter
} from '../../services/pugepgp'
import UserContext from '../../context/user'
import TableButton from '../tableButton'
import UpdateEpGp from './updateEpGp'

const Container = styled.tr`
    height: 30px;
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const HistoryContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.75);
    z-index: 3;
`
const History = styled.div`
    background: ${props => props.theme.colors.background};
    font-size: 12px;
    padding: 5px;
    margin: 5px;
    border-radius: 4px;
`
const HistoryTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    & th {
        padding: 4px;
    }

    & tbody tr:nth-child(odd) {
        background: ${props => props.theme.colors.tableOddRowBackground};
    }

    & td {
        padding: 2px;
    }

    & td:nth-child(1) {
        width: 120px;
    }
`
const CloseHistoryButton = styled.button`
    display: inline-block;
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 2px;
    margin: 2px auto;
    border-radius: 4px;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`

class Pug extends React.Component {
    state = {
        history: false
    }

    openHistory = () => {
        this.setState({ history: true })
    }

    closeHistory = () => {
        this.setState({ history: false })
    }

    handleActivateCharacter = () => {
        const { id } = this.props.data
        activateCharacter(id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error activating character, please try re-logging.')
        })
    }

    handleDeactivateCharacter = () => {
        const { id } = this.props.data
        deactivateCharacter(id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deactivating character, please try re-logging.')
        })
    }

    handleDeleteCharacter = () => {
        const { id } = this.props.data
        if (window.confirm('Are you sure you want to delete this character?')) {
            deleteCharacter(id)
            .then(() => {
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error deleting character, please try re-logging.')
            })
        }
    }

    render() {
        const { id, name, ep, gp } = this.props.data
        return (
            <UserContext.Consumer>
                {user => (
                    <>
                        <Container>
                            <td>{name}</td>
                            <td>{ep.toFixed()}</td>
                            <td>{gp.toFixed()}</td>
                            <td>{(ep.toFixed() / gp.toFixed()).toFixed(2)}</td>
                            {(user.is_officer)
                            ?
                            <td>
                                <ButtonWrapper>
                                    <UpdateEpGp id={id} />
                                    <TableButton title='H' onClick={this.openHistory} />
                                    {(this.props.active)
                                    ?
                                    <TableButton title='↓' onClick={this.handleDeactivateCharacter} />
                                    :
                                    <TableButton title='↑' onClick={this.handleActivateCharacter} />
                                    }
                                    <TableButton title='✗' onClick={this.handleDeleteCharacter} />
                                </ButtonWrapper>
                            </td>
                            :
                            null
                            }
                        </Container>
                        {(this.state.history)
                        ?
                        <HistoryContainer>
                            <History>
                                <HistoryTable>
                                    <thead>
                                        <tr>
                                            <th>Timestamp</th>
                                            <th>EP Amount</th>
                                            <th>GP Amount</th>
                                            <th>Previous EP</th>
                                            <th>Previous GP</th>
                                            <th>Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(this.props.data.transactions.map(h => (
                                            <tr key={`transaction_id_${h.id}`}>
                                                <td>{Moment(h.timestamp).format('MM/DD/YYYY HH:mm:ss')}</td>
                                                <td>{(h.ep_amount)?h.ep_amount.toFixed():''}</td>
                                                <td>{(h.gp_amount)?h.gp_amount.toFixed():''}</td>
                                                <td>{h.previous_ep.toFixed()}</td>
                                                <td>{h.previous_gp.toFixed()}</td>
                                                <td>{h.note}</td>
                                            </tr>
                                        )))}
                                    </tbody>
                                </HistoryTable>
                                <CloseHistoryButton onClick={this.closeHistory}>Close</CloseHistoryButton>
                            </History>
                        </HistoryContainer>
                        :
                        null
                        }
                    </>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Pug
