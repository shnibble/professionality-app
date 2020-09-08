import React from 'react'
import styled from 'styled-components'
import { 
    deleteEncounterAssignment, 
    updateEncounterAssignmentMarker, 
    updateEncounterAssignmentTask,
    updateEncounterAssignmentCharacter,
    addEncounterAssignmentSupport
} from '../../services/encounters'
import AddButtonSmall from '../addButtonSmall'
import Support from './support'
import RaidMarkerSelector from './raidMarkerSelector'
import SkullImg from '../../images/IconSmall_RaidSkull.png'
import CrossImg from '../../images/IconSmall_RaidCross.png'
import CircleImg from '../../images/IconSmall_RaidCircle.png'
import StarImg from '../../images/IconSmall_RaidStar.png'
import SquareImg from '../../images/IconSmall_RaidSquare.png'
import TriangleImg from '../../images/IconSmall_RaidTriangle.png'
import DiamondImg from '../../images/IconSmall_RaidDiamond.png'
import MoonImg from '../../images/IconSmall_RaidMoon.png'

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
        grid-template-columns: 30px 120px 1fr;
    }
`
const SupportContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    border-radius: 4px;
    margin: 0 50px 0 10px;
`
const SupportsHeader = styled.h5`
    color: #ccc;
    font-size: 12px;
    padding: 2px;
`
const RaidTarget = styled.div`
    width: 30px;
    height: 30px;
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: center;

    &.icon-1 {
        background-image: url(${SkullImg});
    }
    &.icon-2 {
        background-image: url(${CrossImg});
    }
    &.icon-3 {
        background-image: url(${CircleImg});
    }
    &.icon-4 {
        background-image: url(${StarImg});
    }
    &.icon-5 {
        background-image: url(${SquareImg});
    }
    &.icon-6 {
        background-image: url(${TriangleImg});
    }
    &.icon-7 {
        background-image: url(${DiamondImg});
    }
    &.icon-8 {
        background-image: url(${MoonImg});
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

class Assignment extends React.Component {

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

    handleDeleteAssignment = () => {
        deleteEncounterAssignment(this.props.data.id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deleting Assignment, please try re-logging.')
        })
    }

    handleUpdateAssignmentMarker = (raid_target_marker) => {
        updateEncounterAssignmentMarker(this.props.data.id, raid_target_marker)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Assignment, please try re-logging.')
        })
    }

    handleUpdateAssignmentTask = () => {
        const task = this.state.task
        updateEncounterAssignmentTask(this.props.data.id, task)
        .then(() => {
            this.setState({ update_task: false })
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Assignment, please try re-logging.')
        })
    }

    handleUpdateAssignmentCharacter = (ev) => {
        const character_id = ev.target.value
        updateEncounterAssignmentCharacter(this.props.data.id, character_id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Assignment, please try re-logging.')
        })
    }

    handleAddAssignmentSupport = () => {
        addEncounterAssignmentSupport(this.props.data.id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error adding Assignment Support, please try re-logging.')
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
                            <RaidMarkerSelector value={this.props.data.raid_marker_id || ''} onClickFunction={this.handleUpdateAssignmentMarker} />
                            :
                            <RaidTarget className={`icon-${this.props.data.raid_marker_id}`} />
                            }
                        </div>

                        <div>
                            {(this.props.edit)
                            ?
                            <EditCharacterSelect value={this.props.data.character_id || ''} onChange={this.handleUpdateAssignmentCharacter}>
                                <option value={''}></option>
                                {this.props.characters.map(character => <option key={`character_option_id_${character.id}`} value={character.id}>{character.name}</option> )}
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
                                    <EditTaskButtonCheck onClick={this.handleUpdateAssignmentTask}>✓</EditTaskButtonCheck>
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
                        <DeleteButton onClick={this.handleDeleteAssignment}>✗</DeleteButton>
                        :
                        null
                        }
                    </div>
                </TopContainer>
                <SupportContainer>
                    {(this.props.data.supports.length)
                    ?
                    <SupportsHeader>Support:</SupportsHeader>
                    :
                    null
                    }
                    {(this.props.data.supports.map(support => (
                        <Support 
                            key={`support_id_${support.id}`} 
                            data={support} 
                            edit={this.props.edit} 
                            characters={this.props.characters} 
                            loadDataFunction={this.props.loadDataFunction}
                        /> 
                    )))}
                    {(this.props.edit)
                    ?
                    <AddButtonSmall title='Add Support' onClick={this.handleAddAssignmentSupport} />
                    :
                    null
                    }
                </SupportContainer>
            </Container>
        )
    }
}

export default Assignment
