import axios from 'axios'
import Cookies from 'js-cookie'

export const signup = (event_id, character_id, role_id, tentative, late, note) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/attendance/signup', {
            jwt,
            event_id,
            character_id,
            role_id,
            tentative,
            late,
            note
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const callout = (event_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/attendance/callout', {
            jwt,
            event_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const cancel = (event_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/attendance/cancel', {
            jwt,
            event_id
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
    signup,
    callout,
    cancel
}