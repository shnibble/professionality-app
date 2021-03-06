import axios from 'axios'
import Cookies from 'js-cookie'

export const getActiveCharacters = () => {
    return new Promise( (resolve, reject) => {
        axios.get('https://professionality-api.com/character/getActive')
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addCharacter = (character_name, character_race_id, character_class_id, character_role_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/add', {
            jwt,
            character_name,
            character_race_id,
            character_class_id,
            character_role_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteCharacter = (character_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/delete', {
            jwt,
            character_id,
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateCharacterRaceId = (character_id, race_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/edit/race', {
            jwt,
            character_id,
            race_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateCharacterClassId = (character_id, class_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/edit/class', {
            jwt,
            character_id,
            class_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateCharacterRoleId = (character_id, role_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/edit/role', {
            jwt,
            character_id,
            role_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
    
}

export const updateCharacterAttunements = (character_id, attuned_mc, attuned_ony, attuned_bwl, attuned_naxx) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/edit/attunements', {
            jwt,
            character_id,
            attuned_mc,
            attuned_ony,
            attuned_bwl,
            attuned_naxx
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
    
}

export const updateCharacterProfessions = (character_id, profession_id_one, profession_id_two) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/edit/professions', {
            jwt,
            character_id,
            profession_id_one,
            profession_id_two
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
    
}

export const updateCharacterSort = (character_ids) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/character/edit/sort', {
            jwt,
            character_ids
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
    getActiveCharacters,
    addCharacter,
    deleteCharacter,
    updateCharacterRaceId,
    updateCharacterClassId,
    updateCharacterRoleId,
    updateCharacterAttunements,
    updateCharacterProfessions,
    updateCharacterSort
}
