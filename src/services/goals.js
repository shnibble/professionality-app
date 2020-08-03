import axios from 'axios'
import Cookies from 'js-cookie'

export const addGoal = (title, description, ep_reward) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/goals/add', {
                jwt,
                title,
                description,
                ep_reward
            })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateGoal = (goal_id, title, description, ep_reward) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/goals/update', {
                jwt,
                goal_id,
                title,
                description,
                ep_reward
            })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteGoal = (goal_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/goals/delete', {
                jwt,
                goal_id
            })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default {
    addGoal,
    updateGoal,
    deleteGoal
}