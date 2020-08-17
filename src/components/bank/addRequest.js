import React from 'react'
import styled from 'styled-components'
import { addRequest } from '../../services/requests'
import AddButton from '../addButton'
import Popout from '../popout'

const Container = styled.div`

`
const Field = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const Textarea = styled.textarea`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
    height: 100px;
    resize: none;
`

class AddRequest extends React.Component {
    state = {
        active: false,
        updating: false,
        message: '',
        timeframe: ''
    }

    handleAddRequest = () => {
        this.setState({ updating: true })
        if (this.state.message === '' || this.state.timeframe === '') {
            window.alert('Please enter a valid message and timeframe.')
            this.setState({ updating: false })
        } else {
            addRequest(this.state.message, this.state.timeframe)
            .then(() => {
                this.setState({ active: false, updating: false, message: '', timeframe: '' })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding request, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    openAddBankRequest = () => {
        this.setState({ active: true })
    }

    closeAddBankRequest = () => {
        this.setState({ active: false })
    }

    updateMessage = (ev) => {
        const message = ev.target.value
        this.setState({ message })
    }

    updateTimeframe = (ev) => {
        const timeframe = ev.target.value
        this.setState({ timeframe })
    }

    render() {
        return (
            <Container>
                <AddButton title='Add Request' onClick={this.openAddBankRequest} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.handleAddRequest} cancelFunction={this.closeAddBankRequest} disabled={this.state.updating}>
                    <h4>Add Request</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td>Request:</td>
                                <td>
                                    <Textarea value={this.state.message} onChange={this.updateMessage} />
                                </td>
                            </tr>
                            <tr>
                                <td>Timeframe:</td>
                                <td><Field type='text' value={this.state.timeframe} onChange={this.updateTimeframe} /></td>
                            </tr>
                        </tbody>
                    </table>
                </Popout>
                :
                null
                }
            </Container>
        )
    }
}

export default AddRequest