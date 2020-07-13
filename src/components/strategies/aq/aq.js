import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Article from '../../article'
import TheProphetSkeram from './theProphetSkeram'
import BugFamily from './bugFamily'
import BattleguardSartura from './battleguardSartura'
import FankrissTheUnyielding from './fankrissTheUnyielding'
import Viscidus from './viscidus'
import PrincessHuhuran from './princessHuhuran'
import TwinEmperors from './twinEmperors'
import Ouro from './ouro'
import Cthun from './cthun'
import Trash from './trash'

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

const Aq = () => (
    <>
        <Article>
            <Ul>
                <Li><StyledLink to='/strategies/aq/the_prophet_skeram'>The Prophet Skeram</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/bug_family'>Bug Family</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/battleguard_sartura'>Battleguard Sartura</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/fankriss_the_unyielding'>Fankriss the Unyielding</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/viscidus'>Viscidus</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/princess_huhuran'>Princess Huhuran</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/twin_emperors'>Twin Emperors</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/ouro'>Ouro</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/c_thun'>C'thun</StyledLink></Li>
                <Li><StyledLink to='/strategies/aq/trash'>Trash</StyledLink></Li>
            </Ul>
        </Article>
            <Route path={'/strategies/aq/the_prophet_skeram'} component={TheProphetSkeram} />
            <Route path={'/strategies/aq/bug_family'} component={BugFamily} />
            <Route path={'/strategies/aq/battleguard_sartura'} component={BattleguardSartura} />
            <Route path={'/strategies/aq/fankriss_the_unyielding'} component={FankrissTheUnyielding} />
            <Route path={'/strategies/aq/viscidus'} component={Viscidus} />
            <Route path={'/strategies/aq/princess_huhuran'} component={PrincessHuhuran} />
            <Route path={'/strategies/aq/twin_emperors'} component={TwinEmperors} />
            <Route path={'/strategies/aq/ouro'} component={Ouro} />
            <Route path={'/strategies/aq/c_thun'} component={Cthun} />
            <Route path={'/strategies/aq/trash'} component={Trash} />
            <Route exact path={'/strategies/aq'}>
                <Redirect to={'/strategies/aq/the_prophet_skeram'} />
            </Route>
    </>
)

export default Aq
