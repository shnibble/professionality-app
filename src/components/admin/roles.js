import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getRoles } from '../../services/admin'
import Article from '../article'
import AddRole from './addRole'
import Role from './role'

const Container = styled.section`

`
const RolesContainer = styled.div`
    max-width: 400px;
`

const Roles = () => {
    const [roles, setRoles] = useState([])

    const getData = () => {
        getRoles()
        .then(data => {
            setRoles(data)
        })
    }
    useEffect(getData, [])

    return (
        <Container>
            <Article>
                <AddRole loadDataFunction={getData} />
                <RolesContainer>
                    {roles.map(role => <Role key={`role_${role.id}`} data={role} loadDataFunction={getData} />)}
                </RolesContainer>
            </Article>
        </Container>
    )
}

export default Roles
