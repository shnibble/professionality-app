import React from 'react'
import styled from 'styled-components'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'
import {
    deleteCharacter,
    updateCharacterRaceId,
    updateCharacterClassId,
    updateCharacterRoleId,
    updateCharacterAttunements,
    updateCharacterProfessions
} from '../../services/character'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const Background = styled.div`
    flex-grow: 1;
    background: #202020;
    padding: 5px;
    margin: 5px;
    border: 1px solid #606060;
    border-radius: 4px;
    color: #ccc;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`
const Section = styled.section`
    position: relative;
    margin: 5px;
    text-align: center;
`
const RCRSelect = styled.select`
    background: none;
    color: #f2f2f2;
    border: none;
    border-radius: 4px;
    margin: 2px;
    padding: 2px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: #606060;
    }

    & > option {
        background-color: #606060;
    }
`
const CheckboxContainer = styled.label`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 4px;

    &:hover {
        background: #606060;
    }
`
const Checkbox = styled.input`
    display: none;

    &:checked + div {
        background-image: url(${CheckboxTrueImg});
    }
`
const Checkmark = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-image: url(${CheckboxFalseImg});
    background-size: 100%;
`
const ProfessionSelect = styled.select`
    background: none;
    color: #f2f2f2;
    border: none;
    border-radius: 4px;
    margin: 1px;
    padding: 2.5px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: #606060;
    }

    & > option {
        background-color: #606060;
    }
`
const Table = styled.table`
    text-align: center;
    border: 1px solid #606060;
    border-radius: 4px;
    min-width: 210px;
    min-height: 55px;

    & > tbody > tr > td {
        padding: 2px;
    }

    & > thead > tr > th {
        text-decoration: underline;
        font-weight: normal;
        padding: 2px;
    }
`
const Name = styled.p`
    font-size: 24px;
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
const RaceClassRole = styled.p`
    
`
const SideButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 5px 2px;
`
const DeleteButton = styled.button`
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 5px 2px;
    margin: 2px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`
const MoveButton = styled.button`
    background: #ccc;
    border: 2px solid #ccc;
    color: #f2f2f2;
    padding: 5px 2px;
    margin: 5px 2px;
    border-radius: 4px;
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #ccc;
    }
`

class Character extends React.Component {

    state = {
        race_id: this.props.data.race_id || 1,
        class_id: this.props.data.class_id || 1,
        role_id: this.props.data.role_id || 1,
        attuned_mc: this.props.data.attuned_mc,
        attuned_ony: this.props.data.attuned_ony,
        attuned_bwl: this.props.data.attuned_bwl,
        attuned_naxx: this.props.data.attuned_naxx,
        profession_id_one: this.props.data.profession_id_one || '',
        profession_id_two: this.props.data.profession_id_two || ''
    }

    delete = () => {
        if (window.confirm('Are you sure you want to delete this character?')) {
            deleteCharacter(this.props.data.id)
            .then(() => {
                this.props.loadData()
            })
            .catch(err => {
                window.alert('Error deleting character, please try re-logging.')
            })
        }
    }

    updateRaceId = (ev) => {
        const race_id = ev.target.value
        updateCharacterRaceId(this.props.data.id, race_id)
        .then(() => {
            this.setState({ race_id })
        })
        .catch(err => {
            window.alert('Error updating character, please try re-logging.')
        })
    }

    updateClassId = (ev) => {
        const class_id = ev.target.value
        updateCharacterClassId(this.props.data.id, class_id)
        .then(() => {
            this.props.loadData()
            this.setState({ class_id })
        })
        .catch(err => {
            window.alert('Error updating character, please try re-logging.')
        })
    }

    updateRoleId = (ev) => {
        const role_id = ev.target.value
        updateCharacterRoleId(this.props.data.id, role_id)
        .then(() => {
            this.setState({ role_id })
        })
        .catch(err => {
            window.alert('Error updating character, please try re-logging.')
        })
    }

    updateAttunements = (attuned_mc, attuned_ony, attuned_bwl, attuned_naxx) => {
        updateCharacterAttunements(this.props.data.id, attuned_mc, attuned_ony, attuned_bwl, attuned_naxx)
        .then(() => {
            this.setState({
                attuned_mc,
                attuned_ony,
                attuned_bwl,
                attuned_naxx
            })
        })
        .catch(err => {
            window.alert('Error updating character, please try re-logging.')
        })
    }

    updateAttunedMc = (ev) => {
        const attuned_mc = ev.target.checked
        const { attuned_ony, attuned_bwl, attuned_naxx } = this.state
        this.updateAttunements(attuned_mc, attuned_ony, attuned_bwl, attuned_naxx)
    }

    updateAttunedOny = (ev) => {
        const attuned_ony = ev.target.checked
        const { attuned_mc, attuned_bwl, attuned_naxx } = this.state
        this.updateAttunements(attuned_mc, attuned_ony, attuned_bwl, attuned_naxx)
    }

    updateAttunedBwl = (ev) => {
        const attuned_bwl = ev.target.checked
        const { attuned_mc, attuned_ony, attuned_naxx } = this.state
        this.updateAttunements(attuned_mc, attuned_ony, attuned_bwl, attuned_naxx)
    }

    updateAttunedNaxx = (ev) => {
        const attuned_naxx = ev.target.checked
        const { attuned_mc, attuned_ony, attuned_bwl } = this.state
        this.updateAttunements(attuned_mc, attuned_ony, attuned_bwl, attuned_naxx)
    }

    updateProfessions = (profession_id_one, profession_id_two) => {
        updateCharacterProfessions(this.props.data.id, profession_id_one, profession_id_two)
        .then(() => {
            this.setState({
                profession_id_one,
                profession_id_two
            })
        })
        .catch(err => {
            window.alert('Error updating character, please try re-logging.')
        })
    }

    updateProfessionOne = (ev) => {
        const profession_id_one = ev.target.value
        const { profession_id_two } = this.state
        this.updateProfessions(profession_id_one, profession_id_two)
    }

    updateProfessionTwo = (ev) => {
        const profession_id_two = ev.target.value
        const { profession_id_one } = this.state
        this.updateProfessions(profession_id_one, profession_id_two)
    }

    render() {
        const { data } = this.props

        return (
            <Container>
                <Background>
                    <Section>
                        <Name className={`class-${data.class_id}`}>{data.name}</Name>
                        <RaceClassRole>
                            <RCRSelect value={this.state.race_id} onChange={this.updateRaceId}>
                                <option value={1}>Human</option>
                                <option value={3}>Dwarf</option>
                                <option value={4}>Night Elf</option>
                                <option value={7}>Gnome</option>
                            </RCRSelect>
                            <RCRSelect value={this.state.class_id} onChange={this.updateClassId}>
                                <option value={1}>Warrior</option>
                                <option value={2}>Paladin</option>
                                <option value={3}>Hunter</option>
                                <option value={4}>Rogue</option>
                                <option value={5}>Priest</option>
                                <option value={8}>Mage</option>
                                <option value={9}>Warlock</option>
                                <option value={11}>Druid</option>
                            </RCRSelect>
                            <RCRSelect value={this.state.role_id} onChange={this.updateRoleId}>
                                <option value={1}>Caster</option>
                                <option value={2}>Fighter</option>
                                <option value={3}>Healer</option>
                                <option value={4}>Tank</option>
                            </RCRSelect>
                        </RaceClassRole>
                    </Section>
                    <Section>
                        <h3>Attunments</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>MC</th>
                                    <th>ONY</th>
                                    <th>BWL</th>
                                    <th>NAXX</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <CheckboxContainer>
                                            <Checkbox type='checkbox' checked={this.state.attuned_mc} onChange={this.updateAttunedMc} />
                                            <Checkmark />
                                        </CheckboxContainer>
                                    </td>
                                    <td>
                                        <CheckboxContainer>
                                            <Checkbox type='checkbox' checked={this.state.attuned_ony} onChange={this.updateAttunedOny} />
                                            <Checkmark />
                                        </CheckboxContainer>
                                    </td>
                                    <td>
                                        <CheckboxContainer>
                                            <Checkbox type='checkbox' checked={this.state.attuned_bwl} onChange={this.updateAttunedBwl}/>
                                            <Checkmark />
                                        </CheckboxContainer>
                                    </td>
                                    <td>
                                        <CheckboxContainer>
                                            <Checkbox type='checkbox' checked={this.state.attuned_naxx} onChange={this.updateAttunedNaxx} />
                                            <Checkmark />
                                        </CheckboxContainer>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Section>
                    <Section>
                        <h3>Professions</h3>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <ProfessionSelect value={this.state.profession_id_one} onChange={this.updateProfessionOne}>
                                            <option value={null}>None</option>
                                            <option value={1}>Alchemy</option>
                                            <option value={2}>Blacksmith</option>
                                            <option value={3}>Blacksmith (Armorsmith)</option>
                                            <option value={4}>Blacksmith (Weaponsmith)</option>
                                            <option value={5}>Blacksmith (Swordsmith)</option>
                                            <option value={6}>Blacksmith (Axesmith)</option>
                                            <option value={7}>Blacksmith (Hammersmith)</option>
                                            <option value={8}>Enchanting</option>
                                            <option value={9}>Engineering</option>
                                            <option value={10}>Engineering (Gnomish)</option>
                                            <option value={11}>Engineering (Goblin)</option>
                                            <option value={12}>Leatherworking</option>
                                            <option value={13}>Leatherworking (Dragonscale)</option>
                                            <option value={14}>Leatherworking (Elemental)</option>
                                            <option value={15}>Leatherworking (Tribal)</option>
                                            <option value={16}>Tailoring</option>
                                            <option value={17}>Herbalism</option>
                                            <option value={18}>Mining</option>
                                            <option value={19}>Skinning</option>
                                        </ProfessionSelect>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProfessionSelect value={this.state.profession_id_two} onChange={this.updateProfessionTwo}>
                                            <option value={null}>None</option>
                                            <option value={1}>Alchemy</option>
                                            <option value={2}>Blacksmith</option>
                                            <option value={3}>Blacksmith (Armorsmith)</option>
                                            <option value={4}>Blacksmith (Weaponsmith)</option>
                                            <option value={5}>Blacksmith (Swordsmith)</option>
                                            <option value={6}>Blacksmith (Axesmith)</option>
                                            <option value={7}>Blacksmith (Hammersmith)</option>
                                            <option value={8}>Enchanting</option>
                                            <option value={9}>Engineering</option>
                                            <option value={10}>Engineering (Gnomish)</option>
                                            <option value={11}>Engineering (Goblin)</option>
                                            <option value={12}>Leatherworking</option>
                                            <option value={13}>Leatherworking (Dragonscale)</option>
                                            <option value={14}>Leatherworking (Elemental)</option>
                                            <option value={15}>Leatherworking (Tribal)</option>
                                            <option value={16}>Tailoring</option>
                                            <option value={17}>Herbalism</option>
                                            <option value={18}>Mining</option>
                                            <option value={19}>Skinning</option>
                                        </ProfessionSelect>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Section>
                </Background>
                <SideButtonContainer>
                    <DeleteButton onClick={this.delete}>Delete</DeleteButton>
                    <MoveButton>↑</MoveButton>
                    <MoveButton>↓</MoveButton>
                </SideButtonContainer>
            </Container>
        )
    }
}

export default Character
