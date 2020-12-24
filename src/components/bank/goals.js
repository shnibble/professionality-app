import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import UserContext from '../../context/user'
import { updateGoal, deleteGoal } from '../../services/goals'
import Article from '../article'
import AddGoal from './addGoal'
import Goal from './goal'
import Popout from '../popout'

const Table = styled.table`
    width: 100%;
`
const Field = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const Textarea = styled.textarea`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
    height: 100px;
    resize: none;
`

class Goals extends React.Component {
    state = {
        loading: true,
        updating: false,
        error: false,
        goals: [],
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

    handleUpdateGoal = () => {
        this.setState({ updating: true })
        if (this.state.updateGoalTitle.length === 0) {
            window.alert('Please enter a valid goal title.')
            this.setState({ updating: false })
        } else {
            updateGoal(this.state.updateGoalId, this.state.updateGoalTitle, this.state.updateGoalDescription, this.state.updateGoalEpReward)
            .then(() => {
                this.setState({ updateGoalPopout: false, updating: false })
                this.loadData()
            })
            .catch(err => {
                window.alert('Issue updating goal, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    handleDeleteGoal = (ev) => {
        this.setState({ updating: true })
        if (window.confirm('Are you sure you want to delete this bank goal?')) {
            deleteGoal(ev.target.value)
            .then(() => {
                this.loadData()
                this.setState({ updating: false })
            })
            .catch(err => {
                window.alert('Issue deleting goal, please try re-logging.')
                this.setState({ updating: false })
            })
        } else {
            this.setState({ updating: false })
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
                            <p>Bank Characters:</p>
                            <ul>
                                <li>Denmo</li>
                                <li>Blounce</li>
                                <li>Talekeeper</li>
                                <li>Lorekeeper</li>
                            </ul>
                        </Article>
                        <Article>
                            {(user.is_officer)
                            ?
                            <AddGoal loadDataFunction={this.loadData} />
                            :
                            null
                            }
                            {(this.state.goals.map(goal => <Goal key={`goal_id_${goal.id}`} data={goal} openPopoutFunction={this.openUpdateGoalPopout} deleteGoalFunction={this.handleDeleteGoal} disabled={this.state.updating} /> ))}
                        </Article>
                        {(this.state.updateGoalPopout)
                        ?
                        <Popout submitFunction={this.handleUpdateGoal} cancelFunction={this.closeUpdateGoalPopout} disabled={this.state.updating}>
                            <h4>Edit Goal</h4>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Title:</td>
                                        <td>
                                            <Field type='text' value={this.state.updateGoalTitle} onChange={this.updateGoalTitle} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>EP Reward:</td>
                                        <td>
                                            <Field type='text' value={this.state.updateGoalEpReward} onChange={this.updateGoalEpReward} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Description:</td>
                                        <td>
                                            <Textarea type='text' value={this.state.updateGoalDescription} onChange={this.updateGoalDescription} />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
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
