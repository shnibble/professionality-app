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
import { unbench } from '../../services/attendance'

const ClassesBreakdown = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
const UnbenchButton = styled.button`
    height: 30px;
    cursor: pointer;
    background: green;
    border: none;
    color: #f2f2f2;
    padding: 0 2px;
    border-radius: 4px;
`

const Bench = ({ event, loadDataFunction, user }) => {
    let casters = event.attendance.filter(att => att.role_id === 1 && att.signed_up && att.bench)
    let fighters = event.attendance.filter(att => att.role_id === 2 && att.signed_up && att.bench)
    let healers = event.attendance.filter(att => att.role_id === 3 && att.signed_up && att.bench)
    let tanks = event.attendance.filter(att => att.role_id === 4 && att.signed_up && att.bench)

    const unbenchUser = (ev) => {
        const event_id = event.id
        const user_id = ev.target.value
        unbench(event_id, user_id)
        .then(() => {
            loadDataFunction()
        })
        .catch(err => {
            window.alert('Issue unbenching, please try re-logging.')
        })
    }

    return (
        <>
            <TableWrapper>
                <ClassesBreakdown>
                    <ClassGroup>
                        <ClassGroupHeader>Casters</ClassGroupHeader>
                        {(casters.map(member => (
                            <ClassGroupMember key={`bench_breakdown_user_${member.discord_user_id}`}>
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
                                {(user.is_officer || user.discord_user_id === event.raid_leader)
                                ?
                                <UnbenchButton value={member.discord_user_id} onClick={unbenchUser}>Unbench</UnbenchButton>
                                :
                                null
                                }
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Fighters</ClassGroupHeader>
                        {(fighters.map(member => (
                            <ClassGroupMember key={`bench_breakdown_user_${member.discord_user_id}`}>
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
                                {(user.is_officer || user.discord_user_id === event.raid_leader)
                                ?
                                <UnbenchButton value={member.discord_user_id} onClick={unbenchUser}>Unbench</UnbenchButton>
                                :
                                null
                                }
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Healers</ClassGroupHeader>
                        {(healers.map(member => (
                            <ClassGroupMember key={`bench_breakdown_user_${member.discord_user_id}`}>
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
                                {(user.is_officer || user.discord_user_id === event.raid_leader)
                                ?
                                <UnbenchButton value={member.discord_user_id} onClick={unbenchUser}>Unbench</UnbenchButton>
                                :
                                null
                                }
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                    <ClassGroup>
                        <ClassGroupHeader>Tanks</ClassGroupHeader>
                        {(tanks.map(member => (
                            <ClassGroupMember key={`bench_breakdown_user_${member.discord_user_id}`}>
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
                                {(user.is_officer || user.discord_user_id === event.raid_leader)
                                ?
                                <UnbenchButton value={member.discord_user_id} onClick={unbenchUser}>Unbench</UnbenchButton>
                                :
                                null
                                }
                            </ClassGroupMember>
                        )))}
                    </ClassGroup>
                </ClassesBreakdown>
            </TableWrapper>
        </>
    )
}

export default Bench
