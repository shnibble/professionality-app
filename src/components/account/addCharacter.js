import React from 'react'
import styled from 'styled-components'
import Popout from '../popout'
import AddButton from '../addButton'
import SubmitButton from '../submitButton'
import CancelButton from '../cancelButton'
import { addCharacter } from '../../services/character'

const Field = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const Select = styled.select`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`

class AddCharacter extends React.Component {
    state = {
        active: false,
        characterName: '',
        characterRace: '1',
        characterClass: '1',
        characterRole: '1'
    }
    
    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ 
            active: false,
            processing: false,
            characterName: '',
            characterRace: '1',
            characterClass: '1',
            characterRole: '1'
        })
    }

    updateCharacterName = (ev) => {
        const characterName = ev.target.value
        this.setState({ characterName })
    }

    updateCharacterRace = (ev) => {
        const characterRace = ev.target.value
        this.setState({ characterRace })
    }

    updateCharacterClass = (ev) => {
        const characterClass = ev.target.value
        this.setState({ characterClass })
    }

    updateCharacterRole = (ev) => {
        const characterRole = ev.target.value
        this.setState({ characterRole })
    }

    add = () => {
        this.setState({ processing: true })
        const { characterName, characterRace, characterClass, characterRole } = this.state
        if (characterName.length > 1) {
            addCharacter(characterName, characterRace, characterClass, characterRole)
            .then(() => {
                this.setState({
                    active: false,
                    processing: false,
                    characterName: '',
                    characterRace: '1',
                    characterClass: '1',
                    characterRole: '1',
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding character, please try re-logging.')
                this.setState({ processing: false })
            })
        } else {
            window.alert('Please enter a valid character name.')
            this.setState({ processing: false })
        }
    }

    render() {
        return (
            <>
                <AddButton title='Add Character' onClick={this.open} />
                {(this.state.active)
                ?
                <Popout>
                    <h4>Add Character</h4>
                    <Field value={this.state.characterName} onChange={this.updateCharacterName} placeholder='Character Name' />
                    <p><i>Please enter your character name exactly as it appears in-game.</i></p>
                    <Select value={this.state.characterRace} onChange={this.updateCharacterRace}>
                        <option value={1}>Human</option>
                        <option value={3}>Dwarf</option>
                        <option value={4}>Night Elf</option>
                        <option value={7}>Gnome</option>
                    </Select>
                    <Select value={this.state.characterClass} onChange={this.updateCharacterClass}>
                        <option value={1}>Warrior</option>
                        <option value={2}>Paladin</option>
                        <option value={3}>Hunter</option>
                        <option value={4}>Rogue</option>
                        <option value={5}>Priest</option>
                        <option value={8}>Mage</option>
                        <option value={9}>Warlock</option>
                        <option value={11}>Druid</option>
                    </Select>
                    <Select value={this.state.characterRole} onChange={this.updateCharacterRole}>
                        <option value={1}>Caster</option>
                        <option value={2}>Fighter</option>
                        <option value={3}>Healer</option>
                        <option value={4}>Tank</option>
                    </Select>
                    <div>
                        <SubmitButton title='Add' onClick={this.add} disabled={this.state.processing} />
                        <CancelButton title='Cancel' onClick={this.close} />
                    </div>
                </Popout>
                :
                null
                }
            </>
        )
    }
}

export default AddCharacter
