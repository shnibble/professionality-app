import axios from 'axios'
import Cookies from 'js-cookie'

export const updateAvailability = (timeframe, available) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/availability/update', {
            jwt,
            timeframe,
            available
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
    updateAvailability
}
