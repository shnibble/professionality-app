import React from 'react'
import styled from 'styled-components'
import { updateEpgp } from '../../services/pugepgp'
import Popout from '../popout'
import TableButton from '../tableButton'

const Field = styled.input`
    display: inline-block;
    width: 100%;
    max-width: 245px;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`

class UpdateEpGp extends React.Component {
    state = {
        active: false,
        updating: false,
        ep: '',
        gp: '',
        note: ''
    }
    
    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ 
            active: false,
            updating: false,
            ep: '',
            gp: '',
            note: ''
        })
    }

    updateEp = (ev) => {
        const ep = ev.target.value
        this.setState({ ep })
    }

    updateGp = (ev) => {
        const gp = ev.target.value
        this.setState({ gp })
    }

    updateNote = (ev) => {
        const note = ev.target.value
        this.setState({ note })
    }

    add = () => {
        this.setState({ updating: true })
        const { ep, gp, note } = this.state
        const { id } = this.props

        if (ep !== 0 || gp !== 0) {
            updateEpgp(id, ep, gp, note)
            .then(() => {
                this.setState({
                    active: false,
                    updating: false,
                    ep: '',
                    gp: '',
                    note: ''
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error updating EPGP, please try re-logging.')
                this.setState({ updating: false })
            })
        } else {
            window.alert('Please enter a valid EP/GP amount.')
            this.setState({ updating: false })
        }
    }

    render() {
        return (
            <>
                <TableButton title='+/-' onClick={this.open} disabled={this.state.updating} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.add} cancelFunction={this.close} disabled={this.state.updating}>
                    <h4>Update EPGP</h4>
                    <Field type='number' placeholder='EP' value={this.state.ep} onChange={this.updateEp} />
                    <Field type='number' placeholder='GP' value={this.state.gp} onChange={this.updateGp} />
                    <Field type='text' placeholder='Note' value={this.state.note} onChange={this.updateNote} />
                </Popout>
                :
                null
                }
            </>
        )
    }
}

export default UpdateEpGp
