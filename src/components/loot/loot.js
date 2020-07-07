import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Ony from './ony'
import Mc from './mc'
import Bwl from './bwl'

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

const Loot = () => (
    <section>
        <h2>Loot</h2>
        <Ul>
            <Li><StyledLink to='/loot/ony'>Onyxia</StyledLink></Li>
            <Li><StyledLink to='/loot/mc'>Molten Core</StyledLink></Li>
            <Li><StyledLink to='/loot/bwl'>Blackwing Lair</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/loot/ony'} component={Ony} />
            <Route path={'/loot/mc'} component={Mc} />
            <Route path={'/loot/bwl'} component={Bwl} />
            <Route exact path={'/loot'}>
                <Redirect to={'/loot/ony'} />
            </Route>
        </>
    </section>
)

export default Loot