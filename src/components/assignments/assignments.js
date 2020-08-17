import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Mc from './mc'
import Bwl from './bwl'
import Aq from './aq'

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
    color: #000;
    text-decoration: none;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
    transition: all .25s ease;

    &.active {
        color: #ccc;
    }

    &:hover {
        color: #f88000;
    }
`

const Assignments = () => (
    <section>
        <h2>Assignments</h2>
        <Ul>
            <Li><StyledLink to='/assignments/mc'>Molten Core</StyledLink></Li>
            <Li><StyledLink to='/assignments/bwl'>Blackwing Lair</StyledLink></Li>
            <Li><StyledLink to='/assignments/aq'>Ahn'Qiraj</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/assignments/mc'} component={Mc} />
            <Route path={'/assignments/bwl'} component={Bwl} />
            <Route path={'/assignments/aq'} component={Aq} />
            <Route exact path={'/assignments'}>
                <Redirect to={'/assignments/mc'} />
            </Route>
        </>
    </section>
)

export default Assignments
