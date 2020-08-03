import React from 'react'
import styled from 'styled-components'
import { addGoal } from '../../services/goals'
import AddButton from '../addButton'
import Popout from '../popout'

const Container = styled.div`

`
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

class AddGoal extends React.Component {
    state = {
        active: false,
        updating: false,
        title: '',
        ep_reward: '',
        description: '',
    }

    handleAddGoal = () => {
        this.setState({ updating: true })
        if (this.state.title === '' || this.state.description === '') {
            window.alert('Please enter a valid title and description.')
            this.setState({ updating: false })
        } else {
            addGoal(this.state.title, this.state.ep_reward, this.state.description)
            .then(() => {
                this.setState({ active: false, updating: false, title: '', ep_reward: '', description: '' })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding request, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    open = () => {
        this.setState({ active: true })
    }

    close = () => {
        this.setState({ active: false, title: '', ep_reward: '', description: '' })
    }

    updateTitle = (ev) => {
        const title = ev.target.value
        this.setState({ title })
    }

    updateEpReward = (ev) => {
        const ep_reward = ev.target.value
        this.setState({ ep_reward })
    }

    updateDescription = (ev) => {
        const description = ev.target.value
        this.setState({ description })
    }

    render() {
        return (
            <Container>
                <AddButton title='Add Goal' onClick={this.open} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.handleAddGoal} cancelFunction={this.close} disabled={this.state.updating}>
                    <h4>Add Goal</h4>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Title:</td>
                                <td>
                                    <Field type='text' value={this.state.title} onChange={this.updateTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td>EP Reward:</td>
                                <td>
                                    <Field type='text' value={this.state.ep_reward} onChange={this.updateEpReward} />
                                </td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>
                                    <Textarea type='text' value={this.state.description} onChange={this.updateDescription} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Popout>
                :
                null
                }
            </Container>
        )
    }
}

export default AddGoal