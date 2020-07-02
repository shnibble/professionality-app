import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Goals from './goals'
import Inventory from './inventory'
import Requests from './requests'
import Article from '../article'

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
    position: relative;
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
const ActiveCounter = styled.div`
    position: absolute;
    right: -5px;
    top: -5px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: red;
    color: #fff;
    text-align: center;
    font-size: 10px;
    line-height: 20px;
`

class Bank extends React.Component {
    state = { active_bank_requests: 0 }

    loadActiveBankRequests = () => {
        axios.get('https://professionality-api.com/bank/requests/getActive')
        .then(results => {
            this.setState({ active_bank_requests: results.data.length })
        })
    }

    componentDidMount() {
        this.loadActiveBankRequests()
    }

    render() {
        return (
            <section>
                <h2>Bank</h2>
                <Ul>
                    <Li><StyledLink to='/bank/goals'>Goals</StyledLink></Li>
                    <Li><StyledLink to='/bank/inventory'>Inventory</StyledLink></Li>
                    <Li><StyledLink to='/bank/requests'>Requests{(this.state.active_bank_requests)?<ActiveCounter>{this.state.active_bank_requests}</ActiveCounter>:null}</StyledLink></Li>
                </Ul>
                <Article>
                    <p><b>Executive</b> is the name of the Guild Banker used for general deposits (recipes, equipment, miscellaneous). Deposits should be sent to him via mail or in person. Executive can often be available in Ironforge or in Stormwind.</p>
                    <br />
                    <p><b>Distributor</b> is the name of the Guild Banker used for material deposits (ore, herbs, enchanting supplies, etc). Deposits for these items should be sent to him via mail or in person. Distributor can often be available in Ironforge or in Stormwind.</p>
                    <br />
                    <p>It is helpful if you can distribute these items to the right toon for what is hoped to be more efficient storage, however if you don't want to bother separating donations just give everything to Executive and it will be sorted accordingly. If you have any questions please contact Pharmakon.</p>
                </Article>
                <>
                    <Route path={'/bank/goals'} component={Goals} />
                    <Route path={'/bank/inventory'} component={Inventory} />
                    <Route path={'/bank/requests'} render={(props) => ( <Requests {...props} loadActiveRequestsFunction={this.loadActiveBankRequests} /> )} />
                    <Route exact path={'/bank'}>
                        <Redirect to={'/bank/goals'} />
                    </Route>
                </>
            </section>
        )
    }
}

export default Bank
