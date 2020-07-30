import axios from 'axios'
import Cookies from 'js-cookie'

export const addEvent = (title, start) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/calendar/add', {
            jwt,
            title,
            start
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