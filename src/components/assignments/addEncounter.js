import React from 'react'
import styled from 'styled-components'
import { addEncounter } from '../../services/encounters'
import AddButton from '../addButton'
import Popout from '../popout'

const Container = styled.div`

`
const Table = styled.table`
    width: 100%;
`
const Field = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`

class AddEncounter extends React.Component {
    state = {
        active: false,
        updating: false,
        name: '',
    }

    handleAddEncounter = () => {
        this.setState({ updating: true })
        if (this.state.name === '') {
            window.alert('Please enter a valid encounter name.')
            this.setState({ updating: false })
        } else {
            addEncounter(this.props.instance_id, this.state.name)
            .then(() => {
                this.setState({ active: false, updating: false, name: '' })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding encounter, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ active: false, name: '' })
    }

    updateName = (ev) => {
        const name = ev.target.value
        this.setState({ name })
    }

    render() {
        return (
            <Container>
                <AddButton title='Add Encounter' onClick={this.open} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.handleAddEncounter} cancelFunction={this.close} disabled={this.state.updating}>
                    <h4>Add Encounter</h4>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>
                                    <Field type='text' value={this.state.name} onChange={this.updateName} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Popout>
                :
                null
                }
            </Container>
        )
    }
}

export default AddEncounter