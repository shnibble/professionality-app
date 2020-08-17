import React from 'react'
import Article from '../article'
import Assignment from './assignment'
import Healer from './healer'
import AddButton from '../addButton'
import { addEncounterAssignment, addEncounterHealer } from '../../services/encounters'

class Encounter extends React.Component {

    handleAddAssignment = () => {
        addEncounterAssignment(this.props.data.id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error adding Assignment, please try re-logging.')
        })
    }

    handleAddHealer = () => {
        addEncounterHealer(this.props.data.id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error adding Healer, please try re-logging.')
        })
    }

    render() {
        return (
            <Article>
                <h3>{this.props.data.name}</h3>
                <br />
                <h4>Assignments</h4>
                {this.props.data.assignments.map(assignment => (
                    <Assignment key={`assignment_id_${assignment.id}`} data={assignment} characters={this.props.characters} edit={this.props.edit} loadDataFunction={this.props.loadDataFunction} />
                ))}
                {(this.props.edit)
                ?
                <AddButton title='Add Assignment' onClick={this.handleAddAssignment} />
                :
                null
                }
                <br />
                <h4>Healers</h4>
                {this.props.data.healers.map(healer => (
                    <Healer key={`healer_id_${healer.id}`} data={healer} characters={this.props.characters} edit={this.props.edit} loadDataFunction={this.props.loadDataFunction} />
                ))}
                {(this.props.edit)
                ?
                <AddButton title='Add Healer' onClick={this.handleAddHealer} />
                :
                null
                }
            </Article>
        )
    }
}

export default Encounter
