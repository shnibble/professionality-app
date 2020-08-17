import React from 'react'
import styled from 'styled-components'
import { 
    deleteEncounterAssignmentSupport,
    updateEncounterAssignmentSupportCharacter,
    updateEncounterAssignmentSupportHeal,
    updateEncounterAssignmentSupportDispel,
    updateEncounterAssignmentSupportDecurse
} from '../../services/encounters'
import SupportRole from './supportRole'
import HealImg from '../../images/heal.png'
import DispelImg from '../../images/dispel.png'
import DecurseImg from '../../images/decurse.png'

const Container = styled.div`
    display: inline-block;
    margin: 1px;

    &.edit {
        display: grid;
        grid-template-columns: 1fr 40px;
    }
`
const InnerContainer = styled.div`
    background: #666666;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
`
const SupportRoleContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 5px;

    &.edit {
        display: grid;
        grid-template-columns: 30px 30px 30px;
        grid-gap: 5px;
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
const EditCharacterSelect = styled.select`
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
class Support extends React.Component {

    handleDeleteAssignmentSupport = () => {
        const support_id = this.props.data.id
        deleteEncounterAssignmentSupport(support_id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deleting Assignment Support, please try re-logging.')
        })
    }

    handleUpdateAssignmentSupportCharacter = (ev) => {
        const character_id = ev.target.value
        updateEncounterAssignmentSupportCharacter(this.props.data.id, character_id)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Assignment Support, please try re-logging.')
        })
    }

    handleUpdateAssignmentSupportHeal = (ev) => {
        const heal = ev.target.value
        updateEncounterAssignmentSupportHeal(this.props.data.id, heal)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Assignment Support, please try re-logging.')
        })
    }

    handleUpdateAssignmentSupportDispel = (ev) => {
        const dispel = ev.target.value
        updateEncounterAssignmentSupportDispel(this.props.data.id, dispel)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Assignment Support, please try re-logging.')
        })
    }

    handleUpdateAssignmentSupportDecurse = (ev) => {
        const decurse = ev.target.value
        updateEncounterAssignmentSupportDecurse(this.props.data.id, decurse)
        .then(() => {
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Error updating Assignment Support, please try re-logging.')
        })
    }

    render() {
        return (
            <Container className={(this.props.edit)?'edit':''}>
                <InnerContainer>
                    <div>
                        {(this.props.edit)
                        ?
                        <EditCharacterSelect value={this.props.data.character_id || ''} onChange={this.handleUpdateAssignmentSupportCharacter}>
                            <option value={''}></option>
                            {this.props.characters.map(character => <option key={`character_support_option_id_${character.id}`} value={character.id}>{character.name}</option> )}
                        </EditCharacterSelect>
                        :
                        <Character className={`class-${this.props.data.character_class_id}`}>{this.props.data.character_name}</Character>
                        }
                    </div>
                    <SupportRoleContainer className={(this.props.edit)?'edit':''}>
                        <SupportRole src={HealImg} title='Heal' active={this.props.data.heal} onClickFunction={this.handleUpdateAssignmentSupportHeal} edit={this.props.edit} />
                        <SupportRole src={DispelImg} title='Dispel' active={this.props.data.dispel} onClickFunction={this.handleUpdateAssignmentSupportDispel} edit={this.props.edit} />
                        <SupportRole src={DecurseImg} title='Decurse' active={this.props.data.decurse} onClickFunction={this.handleUpdateAssignmentSupportDecurse} edit={this.props.edit} />
                    </SupportRoleContainer>
                </InnerContainer>
                {(this.props.edit)
                ?
                <DeleteButton onClick={this.handleDeleteAssignmentSupport}>✗</DeleteButton>
                :
                null
                }
            </Container>
        )
    }
}

export default Support
