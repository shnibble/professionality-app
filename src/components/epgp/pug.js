import React from 'react'
import styled from 'styled-components'
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

class Pug extends React.Component {


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
        activateCharacter(id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deactivating character, please try re-logging.')
        })
    }

    handleDeleteCharacter = () => {
        const { id } = this.props.data
        activateCharacter(id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deleting character, please try re-logging.')
        })
    }

    render() {
        const { id, name, ep, gp } = this.props.data
        return (
            <UserContext.Consumer>
                {user => (
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
                )}
            </UserContext.Consumer>
        )
    }
}

export default Pug
