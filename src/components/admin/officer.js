import React from 'react'
import styled from 'styled-components'
import { deleteOfficerRole, addOfficerRole } from '../../services/admin'

const Container = styled.tr`
    
    
    & td {
        padding: 5px;
    }
`
const RolesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    grid-gap: 5px;
`
const Role = styled.div`
    background: #666666;
    display: grid;
    grid-template-columns: 1fr 30px;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.5);
`
const Span = styled.span`
    display: block;
    padding: 5px;
    color: #fff;
    line-height: 20px;
`
const Button = styled.button`
    width: 30px;
    color: #fff;
    border: none;
    background: none;
    cursor: pointer;
    transition: all .25s ease;
    
    &:focus, &:hover {
        outline: none;
        color: #f88000;
    }
`
const Select = styled.select`
    margin: 0;
    background: #666666;
    color: #fff;
    height: 30px;
    padding: 5px;
    border: none;
    cursor: pointer;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.5);

    &:focus, &:hover {
        outline: none;
    }
`

const Officer = ({ roles, data, loadDataFunction }) => {

    const handleSelectRole = (ev) => {
        const role_id = ev.target.value
        ev.target.value = null

        if (role_id) {
            addOfficerRole(data.discord_user_id, role_id)
            .then(() => {
                loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding officer role, please try relogging.')
            })
        }
    }

    const handleDelete = (ev) => {
        const role_id = ev.target.value
        deleteOfficerRole(role_id)
        .then(() => {
            loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deleting officer role, please try relogging.')
        })
    }
    
    return (
        <Container>
            <td>{data.nickname}</td>
            <td>
                <RolesContainer>
                    {data.officer_roles.map(role => (
                        <Role key={`officer_role_${role.id}`}>
                            <Span>{role.name}</Span>
                            <Button title='Delete Role' value={role.id} onClick={handleDelete}>X</Button>
                        </Role>
                    ))}
                    <Select onChange={handleSelectRole}>
                        <option value={null}></option>
                        {roles.map(role => <option key={`option_${role.id}`} value={role.id}>{role.name}</option> )}
                    </Select>
                </RolesContainer>
            </td>
        </Container>
    )
}

export default Officer
