import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import styled from 'styled-components'
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
const SubmitButton = styled.button`
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`
const CancelButton = styled.button`
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`

class AddRequest extends React.Component {
    state = {
        active: false,
        message: '',
        timeframe: ''
    }

    addRequest = () => {
        if (this.state.message === '' || this.state.timeframe === '') {
            window.alert('Please enter a valid message and timeframe.')
        } else {
            axios.post('https://professionality-api.com/bank/requests/add', {
                jwt: Cookies.get('token'),
                message: this.state.message,
                timeframe: this.state.timeframe
            })
            .then(() => {
                this.setState({ active: false, message: '', timeframe: '' })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding request, please try re-logging.')
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
                <Popout>
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
                    <div>
                        <SubmitButton onClick={this.addRequest}>Add</SubmitButton>
                        <CancelButton onClick={this.closeAddBankRequest}>Cancel</CancelButton>
                    </div>
                </Popout>
                :
                null
                }
            </Container>
        )
    }
}

export default AddRequest