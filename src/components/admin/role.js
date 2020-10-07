import React from 'react'
import styled from 'styled-components'
import { deleteRole } from '../../services/admin'
import TableButton from '../tableButton'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 60px;
`

const Role = ({ data, loadDataFunction }) => {
    const handleDelete = () => {
        const role_id = data.id
        deleteRole(role_id)
        .then(() => {
            loadDataFunction()
        })
        .catch(err => {
            window.alert('Error deleting role, please try relogging.')
        })
    }
    
    return (
        <Container>
            <span>{data.name}</span>
            <TableButton title='Delete' onClick={handleDelete} />
        </Container>
    )
}

export default Role
