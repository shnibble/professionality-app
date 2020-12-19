import React from 'react'
import styled from 'styled-components'
import TableWrapper from '../tableWrapper'
import CasterIcon from '../../images/caster.png'
import FighterIcon from '../../images/fighter.png'
import HealerIcon from '../../images/healer.png'
import TankIcon from '../../images/tank.png'
import TabardImg from '../../images/tabard.png'
import TentativeImg from '../../images/tentative.png'
import LateImg from '../../images/late.png'

const RaidLeader = styled.p`
    margin: 15px;
`
const DetailsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 10px;
`
const TableIcon = styled.img`
    width: 30px;
    height: 30px;
`
const ClassesBreakdown = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`
const ClassGroup = styled.div`
    display: flex;
    flex-direction: column;
    background: #202020;
    margin: 5px;
    border-radius: 4px;
`
const ClassGroupHeader = styled.h5`
    text-decoration: underline;
    margin: 2px;
    color: #f2f2f2;
    text-align: center;
`
const ClassGroupMember = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2px;
`
const ClassGroupMemberRoleIcon = styled.div`
    width: 30px;
    height: 30px;
    background-size: 100%;
    
    &.role-1 {
        background-image: url(${CasterIcon});
    }
    
    &.role-2 {
        background-image: url(${FighterIcon});
    }
    
    &.role-3 {
        background-image: url(${HealerIcon});
    }
    
    &.role-4 {
        background-image: url(${TankIcon});
    }
`
const ClassGroupMemberIcon = styled.img`
    width: 30px;
    height: 30px;
`
const ClassGroupMemberName = styled.span`
    padding: 5px;

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

const AttendanceBreakdown = ({ event }) => {
    let tanks = event.attendance.filter(att => att.role_id === 4 && att.signed_up)
    let druids = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 11 && att.signed_up)
    let hunters = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 3 && att.signed_up)
    let mages = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 8 && att.signed_up)
    let paladins = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 2 && att.signed_up)
    let priests = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 5 && att.signed_up)
    let rogues = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 4 && att.signed_up)
    let warlocks = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 9 && att.signed_up)
    let warriors = event.attendance.filter(att => att.role_id !== 4 && att.character_class_id === 1 && att.signed_up)

    return (
        <>
            <RaidLeader>Raid Leader: {event.raid_leader_name}</RaidLeader>
            <TableWrapper>
                <DetailsTable>
                    <thead>
                        <tr>
                            <th title='Casters'><TableIcon src={CasterIcon} /></th>
                            <th title='Fighters'><TableIcon src={FighterIcon} /></th>
                            <th title='Healers'><TableIcon src={HealerIcon} /></th>
                            <th title='Tanks'><TableIcon src={TankIcon} /></th>
                            <th>Total</th>
                            <th>Call Outs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{event.total_casters}</td>
                            <td>{event.total_fighters}</td>
                            <td>{event.total_healers}</td>
                            <td>{event.total_tanks}</td>
                            <td>{event.total_sign_ups}</td>
                            <td>{event.total_call_outs}</td>
                        </tr>
                    </tbody>
                </DetailsTable>
            </TableWrapper>
            <TableWrapper>
                <ClassesBreakdown>
                    <ClassGroup>
                        <ClassGroupHeader>Tanks</ClassGroupHeader>
                        {(tanks.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Hunters</ClassGroupHeader>
                        {(hunters.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Priests</ClassGroupHeader>
                        {(priests.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Warriors</ClassGroupHeader>
                        {(warriors.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Mages</ClassGroupHeader>
                        {(mages.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Paladins</ClassGroupHeader>
                        {(paladins.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Rogues</ClassGroupHeader>
                        {(rogues.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Warlocks</ClassGroupHeader>
                        {(warlocks.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Druids</ClassGroupHeader>
                        {(druids.map(member => (
                            <ClassGroupMember key={`attendance_break_user_${member.discord_user_id}`}>
                                <ClassGroupMemberRoleIcon className={`role-${member.role_id}`} />
                                {(member.member)
                                ?
                                <ClassGroupMemberIcon src={TabardImg} title='Guild Member' />
                                :
                                null
                                }
                                {(member.tentative)
                                ?
                                <ClassGroupMemberIcon src={TentativeImg} title='Tentative' />
                                :
                                null
                                }
                                {(member.late)
                                ?
                                <ClassGroupMemberIcon src={LateImg} title='Late' />
                                :
                                null
                                }
                                <ClassGroupMemberName className={`class-${member.character_class_id}`}>{member.character_name}</ClassGroupMemberName>
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                </ClassesBreakdown>
            </TableWrapper>
        </>
    )
}

export default AttendanceBreakdown
