import axios from 'axios'

export const getPugs = () => {
    return new Promise( (resolve, reject) => {
        axios.get('https://professionality-api.com/roster/pugs')
        .then(result => {
            resolve(result.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const getMembers = () => {
    return new Promise( (resolve, reject) => {
        axios.get('https://professionality-api.com/roster/members')
        .then(result => {
            resolve(result.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const getOfficers = () => {
    return new Promise( (resolve, reject) => {
        axios.get('https://professionality-api.com/roster/officers')
        .then(result => {
            resolve(result.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const getUsers = () => {
    return new Promise( (resolve, reject) => {
        axios.get('https://professionality-api.com/roster/users')
        .then(result => {
            resolve(result.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default {
    getPugs,
    getMembers,
    getOfficers,
    getUsers
}
