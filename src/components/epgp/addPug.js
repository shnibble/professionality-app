import React from 'react'
import styled from 'styled-components'
import { addCharacter } from '../../services/pugepgp'
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

class AddPug extends React.Component {
    state = {
        active: false,
        updating: false,
        name: ''
    }
    
    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ 
            active: false,
            updating: false,
            name: ''
        })
    }

    updateName = (ev) => {
        const name = ev.target.value
        this.setState({ name })
    }

    add = () => {
        this.setState({ updating: true })
        const name = this.state.name

        if (name.length > 1) {
            addCharacter(name)
            .then(() => {
                this.setState({
                    active: false,
                    updating: false,
                    name: ''
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding PUG, please try re-logging.')
                this.setState({ updating: false })
            })
        } else {
            window.alert('Please enter a valid character name.')
            this.setState({ updating: false })
        }
    }

    render() {
        return (
            <>
                <AddButton title='Add PUG' onClick={this.open} disabled={this.state.updating} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.add} cancelFunction={this.close} disabled={this.state.updating}>
                    <h4>Add PUG</h4>
                    <Field type='text' placeholder='Character Name' value={this.state.name} onChange={this.updateName} />
                </Popout>
                :
                null
                }
            </>
        )
    }
}

export default AddPug
