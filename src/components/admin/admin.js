import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Roles from './roles'
import OfficerRoles from './officerRoles'
import Settings from './settings'

const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`
const Li = styled.li`
    margin: 5px;
`
const StyledLink = styled(NavLink)`
    padding: 10px;
    color: ${props => props.theme.colors.color};
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
    transition: all .25s ease;

    &.active {
        color: ${props => props.theme.colors.lowlight};
    }

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }
`

const Admin = () => (
    <section>
        <h2>Admin</h2>
        <Ul>
            <Li><StyledLink to='/admin/roles'>Roles</StyledLink></Li>
            <Li><StyledLink to='/admin/officerRoles'>Officer Roles</StyledLink></Li>
            <Li><StyledLink to='/admin/settings'>Settings</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/admin/roles'} component={Roles} />
            <Route path={'/admin/officerRoles'} component={OfficerRoles} />
            <Route path={'/admin/settings'} component={Settings} />
            <Route exact path={'/admin'}>
                <Redirect to={'/admin/roles'} />
            </Route>
        </>
    </section>
)

export default Admin
