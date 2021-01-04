import axios from 'axios'
import Cookies from 'js-cookie'

export const addEvent = (title, start, primary, raid_leader, soft_res) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/calendar/add', {
            jwt,
            title,
            start,
            primary,
            raid_leader,
            soft_res
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEvent = (event_id, title, start, primary, raid_leader, soft_res) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/calendar/update', {
            jwt,
            event_id,
            title,
            start,
            primary,
            raid_leader,
            soft_res
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
    addEvent
}