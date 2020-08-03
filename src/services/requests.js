import axios from 'axios'
import Cookies from 'js-cookie'

export const addRequest = (message, timeframe) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/requests/add', {
                jwt,
                message,
                timeframe
            })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteRequest = (request_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/requests/add', {
                jwt,
                request_id
            })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const cancelRequest = (request_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/requests/cancel', {
                jwt,
                request_id
            })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const rejectRequest = (request_id, rejected_reason) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/requests/reject', {
            jwt,
            request_id,
            rejected_reason
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const completeRequest = (request_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/requests/complete', {
            jwt,
            request_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addRequestComment = (request_id, message) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/requests/comment/add', {
                jwt,
                request_id,
                message
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
    addRequest,
    deleteRequest,
    cancelRequest,
    rejectRequest,
    completeRequest,
    addRequestComment
}