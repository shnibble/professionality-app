import React from 'react'
import styled from 'styled-components'
import CheckboxTrueImg from '../images/checkbox-true.png'
import CheckboxFalseImg from '../images/checkbox-false.png'
import {
    updateCharacterRaceId,
    updateCharacterClassId,
    updateCharacterRoleId 
} from '../services/character'

const Container = styled.div`
    display: block;
    padding: 5px;
    margin: 5px;
    background: #202020;
    border: 1px solid #606060;
    border-radius: 4px;
    color: #ccc;
    display: flex;
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
    cursor: pointer;

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
    width: 210px;
`
const Checkbox = styled.img`
    width: 15px;
    height: 15px;
`

class Character extends React.Component {

    state = {
        race_id: this.props.data.race_id,
        class_id: this.props.data.class_id,
        role_id: this.props.data.role_id
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

    render() {
        const { data } = this.props

        let class_name = ''
        switch(data.class_id) {
            case 1:
                class_name = 'Warrior'
                break
            case 2:
                class_name = 'Paladin'
                break
            case 3:
                class_name = 'Hunter'
                break
            case 4:
                class_name = 'Rogue'
                break
            case 5:
                class_name = 'Priest'
                break
            case 8:
                class_name = 'Mage'
                break
            case 9:
                class_name = 'Warlock'
                break
            case 11:
                class_name = 'Druid'
                break
            default:
                class_name = 'Unknown'
                break
        }
        
        let race_name = ''
        switch(data.race_id) {
            case 1:
                race_name = 'Human'
                break
            case 3:
                race_name = 'Dwarf'
                break
            case 4:
                race_name = 'Night Elf'
                break
            case 7:
                race_name = 'Gnome'
                break
            default:
                race_name = 'Unknown'
                break
        }

        let role_name = ''
        switch(data.role_id) {
            case 1:
                role_name = 'Caster'
                break
            case 2:
                role_name = 'Fighter'
                break
            case 3:
                role_name = 'Healer'
                break
            case 4:
                role_name = 'Tank'
                break
            default:
                role_name = 'Unknown'
                break
        }

        let profession_one_name = ''
        switch(data.profession_id_one) {
            case 1:
                profession_one_name = 'Alchemy'
                break
            case 2:
                profession_one_name = 'Blacksmithing'
                break
            case 3:
                profession_one_name = 'Armorsmith'
                break
            case 4:
                profession_one_name = 'Weaponsmith'
                break
            case 5:
                profession_one_name = 'Swordsmith'
                break
            case 6:
                profession_one_name = 'Axesmith'
                break
            case 7:
                profession_one_name = 'Hammersmith'
                break
            case 8:
                profession_one_name = 'Enchanting'
                break
            case 9:
                profession_one_name = 'Engineering'
                break
            case 10:
                profession_one_name = 'Gnomish Engineering'
                break
            case 11:
                profession_one_name = 'Goblin Engineering'
                break
            case 12:
                profession_one_name = 'Leatherworking'
                break
            case 13:
                profession_one_name = 'Dragonscale Leatherworking'
                break
            case 14:
                profession_one_name = 'Elemental Leatherworking'
                break
            case 15:
                profession_one_name = 'Tribal Leatherworking'
                break
            case 16:
                profession_one_name = 'Tailoring'
                break
            case 17:
                profession_one_name = 'Herbalism'
                break
            case 18:
                profession_one_name = 'Mining'
                break
            case 19:
                profession_one_name = 'Skinning'
                break
            default:
                break
        }

        let profession_two_name = ''
        switch(data.profession_id_two) {
            case 1:
                profession_two_name = 'Alchemy'
                break
            case 2:
                profession_two_name = 'Blacksmithing'
                break
            case 3:
                profession_two_name = 'Armorsmith'
                break
            case 4:
                profession_two_name = 'Weaponsmith'
                break
            case 5:
                profession_two_name = 'Swordsmith'
                break
            case 6:
                profession_two_name = 'Axesmith'
                break
            case 7:
                profession_two_name = 'Hammersmith'
                break
            case 8:
                profession_two_name = 'Enchanting'
                break
            case 9:
                profession_two_name = 'Engineering'
                break
            case 10:
                profession_two_name = 'Gnomish Engineering'
                break
            case 11:
                profession_two_name = 'Goblin Engineering'
                break
            case 12:
                profession_two_name = 'Leatherworking'
                break
            case 13:
                profession_two_name = 'Dragonscale Leatherworking'
                break
            case 14:
                profession_two_name = 'Elemental Leatherworking'
                break
            case 15:
                profession_two_name = 'Tribal Leatherworking'
                break
            case 16:
                profession_two_name = 'Tailoring'
                break
            case 17:
                profession_two_name = 'Herbalism'
                break
            case 18:
                profession_two_name = 'Mining'
                break
            case 19:
                profession_two_name = 'Skinning'
                break
            default:
                break
        }

        return (
            <Container>
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
                                <td><Checkbox src={(data.attuned_mc)?CheckboxTrueImg:CheckboxFalseImg} /></td>
                                <td><Checkbox src={(data.attuned_ony)?CheckboxTrueImg:CheckboxFalseImg} /></td>
                                <td><Checkbox src={(data.attuned_bwl)?CheckboxTrueImg:CheckboxFalseImg} /></td>
                                <td><Checkbox src={(data.attuned_naxx)?CheckboxTrueImg:CheckboxFalseImg} /></td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>
                <Section>
                    <h3>Resistances</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Arc</th>
                                <th>Fir</th>
                                <th>Fro</th>
                                <th>Nat</th>
                                <th>Sha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ color: '#99ccff' }}>{data.resistance_arcane}</td>
                                <td style={{ color: '#ff0000' }}>{data.resistance_fire}</td>
                                <td style={{ color: '#0099ff' }}>{data.resistance_frost}</td>
                                <td style={{ color: '#339933' }}>{data.resistance_nature}</td>
                                <td style={{ color: '#9966ff' }}>{data.resistance_shadow}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>
                <Section>
                    <h3>Professions</h3>
                    <Table>
                        <tbody>
                            <tr>
                                <td>{profession_one_name}</td>
                            </tr>
                            <tr>
                                <td>{profession_two_name}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>
            </Container>
        )
    }
}

export default Character
