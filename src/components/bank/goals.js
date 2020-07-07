import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import UserContext from '../../context/user'
import Article from '../article'
import AddButton from '../addButton'
import Goal from './goal'
import Popout from '../popout'

const EditTable = styled.table`
    width: 100%;

    & tbody > tr > td:nth-child(1) {
        width: 75px;
        text-align: right;
    }

    & tbody > tr > td:nth-child(2) {
        text-align: left;
    }
`
const TitleField = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const RewardField = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 12px;
`
const DescriptionField = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 12px;
    resize: none;
    height: 80px;
`
const SubmitButton = styled.button`
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`
const CancelButton = styled.button`
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`

class Goals extends React.Component {
    state = {
        loading: true,
        error: false,
        goals: [],
        addGoalPopout: false,
        addGoalTitle: '',
        addGoalDescription: '',
        addGoalEpReward: '',
        updateGoalPopout: false,
        updateGoalId: '',
        updateGoalTitle: '',
        updateGoalDescription: '',
        updateGoalEpReward: ''
    }

    loadData = () => {
        axios.get('https://professionality-api.com/bank/goals/get')
        .then(result => {
            this.setState({
                loading: false,
                goals: result.data
            })
        })
        .catch(err => {
            this.setState({
                loading: false,
                error: true
            })
        })
    }

    openAddGoalPopout = () => {
        this.setState({ addGoalPopout: true, updateGoalPopout: false })
    }

    closeAddGoalPopout = () => {
        this.setState({ addGoalPopout: false, updateGoalPopout: false})
    }

    updateAddGoalTitle = (ev) => {
        const title = ev.target.value
        this.setState({ addGoalTitle: title })
    }

    updateAddGoalDescription = (ev) => {
        const description = ev.target.value
        this.setState({ addGoalDescription: description })
    }

    updateAddGoalEpReward = (ev) => {
        const ep_reward = ev.target.value
        this.setState({ addGoalEpReward: ep_reward })
    }

    addGoal = () => {
        if (this.state.addGoalTitle.length === '') {
            window.alert('Please enter a valid goal title.')
        } else {
            axios.post('https://professionality-api.com/bank/goals/add', {
                jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkaXNjb3JkX3VzZXJfaWQiOiIyNjE1MzkzMzk4Nzg2NjIxNDYiLCJpc19tZW1iZXIiOjEsImlzX29mZmljZXIiOjEsIm5pY2tuYW1lIjoiQmFydCIsImp0aSI6ImYyZjAxM2NmLTM2MjMtNDhiYS1hZjNiLTU1YmNmMzQxYWM4OSIsImlhdCI6MTU5MjQxNjU3OSwiZXhwIjoxNTk1MDA4NTc5fQ.J8zQAOvPKmD0IpheIrj86VOLERtmkdP5RS2qQoBo3RE',
                title: this.state.addGoalTitle,
                description: this.state.addGoalDescription,
                ep_reward: this.state.addGoalEpReward
            })
            .then(() => {
                this.setState({ addGoalPopout: false })
                this.loadData()
            })
            .catch(err => {
                window.alert('Issue adding goal, please try re-logging.')
            })
        }
    }

    openUpdateGoalPopout = (ev) => {
        const data = JSON.parse(ev.target.value)
        this.setState({ 
            addGoalPopout: false,
            updateGoalPopout: true,
            updateGoalId: data.id,
            updateGoalTitle: data.title,
            updateGoalDescription: data.description,
            updateGoalEpReward: data.ep_reward
        })
    }

    closeUpdateGoalPopout = () => {
        this.setState({ addGoalPopout: false, updateGoalPopout: false })
    }

    updateGoalTitle = (ev) => {
        const title = ev.target.value
        this.setState({ updateGoalTitle: title })
    }

    updateGoalDescription = (ev) => {
        const description = ev.target.value
        this.setState({ updateGoalDescription: description })
    }

    updateGoalEpReward = (ev) => {
        const ep_reward = ev.target.value
        this.setState({ updateGoalEpReward: ep_reward })
    }

    updateGoal = () => {
        if (this.state.updateGoalTitle.length === 0) {
            window.alert('Please enter a valid goal title.')
        } else {
            axios.post('https://professionality-api.com/bank/goals/update', {
                jwt: Cookies.get('token'),
                goal_id: this.state.updateGoalId,
                title: this.state.updateGoalTitle,
                description: this.state.updateGoalDescription,
                ep_reward: this.state.updateGoalEpReward
            })
            .then(() => {
                this.setState({ updateGoalPopout: false })
                this.loadData()
            })
            .catch(err => {
                window.alert('Issue updating goal, please try re-logging.')
            })
        }
    }

    deleteGoal = (ev) => {
        if (window.confirm('Are you sure you want to delete this bank goal?')) {
            axios.post('https://professionality-api.com/bank/goals/delete', {
                jwt: Cookies.get('token'),
                goal_id: ev.target.value
            })
            .then(() => {
                this.loadData()
            })
            .catch(err => {
                window.alert('Issue deleting goal, please try re-logging.')
            })
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    (this.state.error)
                    ?
                    <Article>
                        <p>Error loading goals.</p>
                    </Article>
                    :
                    (this.state.loading)
                    ?
                    <Article>
                        <p>Loading bank goals...</p>
                    </Article>
                    :
                    <>
                        <Article>
                            <p><b>Executive</b> is the name of the Guild Banker used for general deposits (recipes, equipment, miscellaneous). Deposits should be sent to him via mail or in person. Executive can often be available in Ironforge or in Stormwind.</p>
                            <br />
                            <p><b>Distributor</b> is the name of the Guild Banker used for material deposits (ore, herbs, enchanting supplies, etc). Deposits for these items should be sent to him via mail or in person. Distributor can often be available in Ironforge or in Stormwind.</p>
                            <br />
                            <p>It is helpful if you can distribute these items to the right toon for what is hoped to be more efficient storage, however if you don't want to bother separating donations just give everything to Executive and it will be sorted accordingly. If you have any questions please contact Pharmakon.</p>
                        </Article>
                        <Article>
                            {(user.is_officer)
                            ?
                            <AddButton title='Add Goal' onClick={this.openAddGoalPopout} />
                            :
                            null
                            }
                            {(this.state.goals.map(goal => <Goal key={`goal_id_${goal.id}`} data={goal} openPopoutFunction={this.openUpdateGoalPopout} deleteGoalFunction={this.deleteGoal} /> ))}
                        </Article>
                        {(this.state.updateGoalPopout)
                        ?
                        <Popout>
                            <h4>Edit Goal</h4>
                            <EditTable>
                                <tbody>
                                    <tr>
                                        <td>Title:</td>
                                        <td>
                                            <TitleField type='text' value={this.state.updateGoalTitle} onChange={this.updateGoalTitle} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>EP Reward:</td>
                                        <td>
                                            <RewardField type='text' value={this.state.updateGoalEpReward} onChange={this.updateGoalEpReward} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Description:</td>
                                        <td>
                                            <DescriptionField type='text' value={this.state.updateGoalDescription} onChange={this.updateGoalDescription} />
                                        </td>
                                    </tr>
                                </tbody>
                            </EditTable>
                            <div>
                                <SubmitButton onClick={this.updateGoal}>Update</SubmitButton>
                                <CancelButton onClick={this.closeUpdateGoalPopout}>Cancel</CancelButton>
                            </div>
                        </Popout>
                        :
                        null
                        }
                        {(this.state.addGoalPopout)
                        ?
                        <Popout>
                            <h4>Add Goal</h4>
                            <EditTable>
                                <tbody>
                                    <tr>
                                        <td>Title:</td>
                                        <td>
                                            <TitleField type='text' value={this.state.addGoalTitle} onChange={this.updateAddGoalTitle} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>EP Reward:</td>
                                        <td>
                                            <RewardField type='text' value={this.state.addGoalEpReward} onChange={this.updateAddGoalEpReward} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Description:</td>
                                        <td>
                                            <DescriptionField type='text' value={this.state.addGoalDescription} onChange={this.updateAddGoalDescription} />
                                        </td>
                                    </tr>
                                </tbody>
                            </EditTable>
                            <div>
                                <SubmitButton onClick={this.addGoal}>Add</SubmitButton>
                                <CancelButton onClick={this.closeAddGoalPopout}>Cancel</CancelButton>
                            </div>
                        </Popout>
                        :
                        null
                        }
                    </>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Goals
