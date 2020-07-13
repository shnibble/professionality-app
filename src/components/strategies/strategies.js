import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Ony from './ony'
import Mc from './mc'
import Bwl from './bwl'
import Aq from './aq/aq'

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

const Strategies = () => (
    <section>
        <h2>Strategies</h2>
        <Ul>
            <Li><StyledLink to='/strategies/aq'>Ahn'Qiraj</StyledLink></Li>
        </Ul>
        <>
            <Route path={'/strategies/ony'} component={Ony} />
            <Route path={'/strategies/mc'} component={Mc} />
            <Route path={'/strategies/bwl'} component={Bwl} />
            <Route path={'/strategies/aq'} component={Aq} />
            <Route exact path={'/strategies'}>
                <Redirect to={'/strategies/aq'} />
            </Route>
        </>
    </section>
)

export default Strategies
