import axios from 'axios'
import Cookies from 'js-cookie'

export const getRoles = () => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/admin/roles/get', {
            jwt
        })
        .then(result => {
            resolve(result.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addRole = (name) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/admin/roles/add', {
            jwt,
            name
        })
        .then(() => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteRole = (role_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/admin/roles/delete', {
            jwt,
            role_id
        })
        .then(() => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addOfficerRole = (discord_user_id, role_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/admin/officerRole/add', {
            jwt,
            discord_user_id,
            role_id
        })
        .then(() => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteOfficerRole = (role_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/admin/officerRole/delete', {
            jwt,
            role_id
        })
        .then(() => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}