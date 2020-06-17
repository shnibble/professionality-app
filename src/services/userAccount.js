import axios from 'axios'

export const getUserAccount = (discord_user_id) => {
    return new Promise( (resolve, reject) => {
        axios.get(`https://professionality-api.com/account/get?discord_user_id=${discord_user_id}`)
        .then(result => {
            resolve(result.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default { getUserAccount }
