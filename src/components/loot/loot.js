import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Ony from './ony'
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

const Loot = () => (
    <section>
        <h2>Loot</h2>
        <Ul>
            <Li><StyledLink to='/loot/ony'>Onyxia</StyledLink></Li>
            <Li><StyledLink to='/loot/mc'>Molten Core</StyledLink></Li>
            <Li><StyledLink to='/loot/bwl'>Blackwing Lair</StyledLink></Li>
            <Li><StyledLink to='/loot/aq'>Ahn'Qiraj</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/loot/ony'} component={Ony} />
            <Route path={'/loot/mc'} component={Mc} />
            <Route path={'/loot/bwl'} component={Bwl} />
            <Route path={'/loot/aq'} component={Aq} />
            <Route exact path={'/loot'}>
                <Redirect to={'/loot/ony'} />
            </Route>
        </>
    </section>
)

export default Loot
