import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getOfficers } from '../../services/roster'
import { getRoles } from '../../services/admin'
import Officer from './officer'
import Article from '../article'

const Container = styled.section`

`
const Table = styled.table`
    border-collapse: collapse;
`

const OfficerRoles = () => {
    const [officers, setOfficers] = useState([])
    const [roles, setRoles] = useState([])
    
    const loadData = () => {
        getOfficers()
        .then(data => {
            setOfficers(data)
        })

        getRoles()
        .then(data => {
            setRoles(data)
        })
    }

    useEffect(loadData, [])
    return (
        <Container>
            <Article>
                <Table>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>Roles</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {officers.map(officer => <Officer key={`officer_id_${officer.discord_user_id}`} roles={roles} data={officer} loadDataFunction={loadData} /> )}
                    </tbody>
                </Table>
            </Article>
        </Container>
    )
}

export default OfficerRoles
