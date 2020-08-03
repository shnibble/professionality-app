import axios from 'axios'
import Cookies from 'js-cookie'

export const addInventory = (item_id, name, quality, icon, category_id, random_enchantment) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/inventory/add', {
            jwt,
            item_id,
            name,
            quality,
            icon,
            category_id,
            random_enchantment
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateInventory = (inventory_id, category_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/inventory/update', {
            jwt,
            inventory_id,
            category_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteInventory = (inventory_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/bank/inventory/delete', {
            jwt,
            inventory_id
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
    addInventory,
    updateInventory,
    deleteInventory
}