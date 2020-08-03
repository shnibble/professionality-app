import axios from 'axios'

export const getItems = (search) => {
    return new Promise( (resolve, reject) => {
        axios.get('https://professionality-api.com/items/get', {
            params: {
                search
            }
        })
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default {
    getItems
}