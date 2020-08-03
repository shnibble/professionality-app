import axios from 'axios'
import Cookies from 'js-cookie'

export const updateLoot = (loot_id, priority, comments) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/loot/update', {
                jwt,
                loot_id,
                priority,
                comments
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
    updateLoot
}