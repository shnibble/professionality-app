import React from 'react'
import styled from 'styled-components'
import { 
    deleteEncounterHealer, 
    updateEncounterHealerCharacter, 
    updateEncounterHealerTask
} from '../../services/encounters'

const Container = styled.div`
    margin: 1px 0 5px 0;
`
const TopContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
`
const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    grid-gap: 5px;
    align-items: center;
    background: #404040;
    color: #ccc;
    padding: 5px;
    border-radius: 4px;

    &.edit {
        display: grid;
        grid-template-columns: 120px 1fr;
    }
`
const EditTaskContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 30px 30px;
    grid-gap: 5px;
`
const EditTaskField = styled.input`
    width: 100%;
    height: 30px;
    box-sizing: border-box;
`
const EditTaskButtonCheck = styled.button`
    width: 30px;
    height: 30px;
    color: green;
    font-size: 20px;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
`
const EditTaskButtonCross = styled.button`
    width: 30px;
    height: 30px;
    color: red;
    font-size: 20px;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
`
const EditCharacterSelect = styled.select`
    width: 100%;
    height: 30px;
`
const Character = styled.span`
    font-weight: bold;

    &.class-1 {
        color: #C79C6E;
    }
    &.class-2 {
        color: #F58CBA;
    }
    &.class-3 {
        color: #ABD473;
    }
    &.class-4 {
        color: #FFF569;
    }
    &.class-5 {
        color: #FFFFFF;
    }
    &.class-8 {
        color: #69CCF0;
    }
    &.class-9 {
        color: #9482C9;
    }
    &.class-11 {
        color: #FF7D0A;
    }
`
const DeleteButton = styled.button`
    width: 30px;
    height: 30px;
    color: red;
    font-size: 20px;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
`

class Healer extends React.Component {

    state = {
        task: this.props.data.task || '',
        update_task: false
    }

    updateTask = (ev) => {
        const task = ev.target.value
        this.setState({ task, update_task: true })
    }

    cancelUpdateTask = () => {
        this.setState({ task: this.props.data.task, update_task: false })
    }

    handleDeleteHealer = () => {
        deleteEncounterHealer(this.props.data.id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deleting Healer, please try re-logging.')
        })
    }

    handleUpdateHealerCharacter = (ev) => {
        const character_id = ev.target.value
        updateEncounterHealerCharacter(this.props.data.id, character_id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Healer, please try re-logging.')
        })
    }

    handleUpdateHealerTask = () => {
        const task = this.state.task
        updateEncounterHealerTask(this.props.data.id, task)
        .then(() => {
            this.setState({ update_task: false })
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Healer, please try re-logging.')
        })
    }

    render() {
        return (
            <Container>
                <TopContainer>
                    <InnerContainer className={(this.props.edit)?'edit':''}>
                        <div>
                            {(this.props.edit)
                            ?
                            <EditCharacterSelect value={this.props.data.character_id || ''} onChange={this.handleUpdateHealerCharacter}>
                                <option value={''}></option>
                                {this.props.characters.map(character => <option key={`character_healer_option_id_${character.id}`} value={character.id}>{character.name}</option> )}
                            </EditCharacterSelect>
                            :
                            <Character className={`class-${this.props.data.character_class_id}`}>{this.props.data.character_name}</Character>
                            }
                        </div>

                        <div>
                            {(this.props.edit)
                            ?
                            <EditTaskContainer>
                                <EditTaskField type='text' value={this.state.task} onChange={this.updateTask} />
                                {(this.state.update_task)
                                ?
                                <>
                                    <EditTaskButtonCheck onClick={this.handleUpdateHealerTask}>✓</EditTaskButtonCheck>
                                    <EditTaskButtonCross onClick={this.cancelUpdateTask}>✗</EditTaskButtonCross>
                                </>
                                :
                                null
                                }
                            </EditTaskContainer>
                            :
                            <span>{this.props.data.task}</span>
                            }
                        </div>
                    </InnerContainer>
                    <div>
                        {(this.props.edit)
                        ?
                        <DeleteButton onClick={this.handleDeleteHealer}>✗</DeleteButton>
                        :
                        null
                        }
                    </div>
                </TopContainer>
            </Container>
        )
    }
}

export default Healer
