import axios from 'axios'
import Cookies from 'js-cookie'

export const updateEpgp = (id, ep_amount, gp_amount, note) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/pugepgp/update', {
            jwt,
            id,
            ep_amount,
            gp_amount,
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

export const updateActiveEp = (ep_amount, note) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/pugepgp/updateActiveEp', {
            jwt,
            ep_amount: Number.parseInt(ep_amount),
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

export const applyDecay = () => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/pugepgp/applyDecay', {
            jwt
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addCharacter = (name) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/pugepgp/character/add', {
            jwt,
            name
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteCharacter = (id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/pugepgp/character/delete', {
            jwt,
            id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const activateCharacter = (id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/pugepgp/character/activate', {
            jwt,
            id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deactivateCharacter = (id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/pugepgp/character/deactivate', {
            jwt,
            id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}
