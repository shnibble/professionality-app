import React from 'react'
import styled from 'styled-components'
import { updateActiveEp } from '../../services/pugepgp'
import Popout from '../popout'
import AddButton from '../addButton'

const Field = styled.input`
    display: inline-block;
    width: 100%;
    max-width: 245px;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`

class ApplyEp extends React.Component {
    state = {
        active: false,
        updating: false,
        ep_amount: '0',
        note: ''
    }
    
    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ 
            active: false,
            updating: false,
            ep_amount: '0',
            note: ''
        })
    }

    updateEpAmount = (ev) => {
        const ep_amount = ev.target.value
        this.setState({ ep_amount })
    }

    updateNote = (ev) => {
        const note = ev.target.value
        this.setState({ note })
    }

    add = () => {
        this.setState({ updating: true })
        const ep_amount = this.state.ep_amount
        const note = this.state.note

        if (ep_amount !== 0 || ep_amount === '') {
            updateActiveEp(ep_amount, note)
            .then(() => {
                this.setState({
                    active: false,
                    updating: false,
                    ep_amount: '0',
                    note: ''
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error applying EP, please try re-logging.')
                this.setState({ updating: false })
            })
        } else {
            window.alert('Please enter a valid EP amount.')
            this.setState({ updating: false })
        }
    }

    render() {
        return (
            <>
                <AddButton title='Apply EP' onClick={this.open} disabled={this.state.updating} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.add} cancelFunction={this.close} disabled={this.state.updating}>
                    <h4>Apply EP to Active PUGs</h4>
                    <Field type='number' placeholder='EP Amount' value={this.state.ep_amount} onChange={this.updateEpAmount} />
                    <Field type='text' placeholder='Note' value={this.state.note} onChange={this.updateNote} />
                </Popout>
                :
                null
                }
            </>
        )
    }
}

export default ApplyEp
