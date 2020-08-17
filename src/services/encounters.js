import axios from 'axios'
import Cookies from 'js-cookie'

export const getEncounters = (instance_id) => {
    return new Promise( (resolve, reject) => {
        axios.get('https://professionality-api.com/encounters/get', {
            params: {
                instance_id
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

export const addEncounter = (instance_id, name) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/add', {
            jwt,
            instance_id,
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

export const deleteEncounter = (encounter_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/delete', {
            jwt,
            encounter_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addEncounterAssignment = (encounter_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/add', {
            jwt,
            encounter_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteEncounterAssignment = (assignment_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/delete', {
            jwt,
            assignment_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterAssignmentMarker = (assignment_id, raid_marker_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/update/marker', {
            jwt,
            assignment_id,
            raid_marker_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterAssignmentTask = (assignment_id, task) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/update/task', {
            jwt,
            assignment_id,
            task
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterAssignmentCharacter = (assignment_id, character_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/update/character', {
            jwt,
            assignment_id,
            character_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addEncounterAssignmentSupport = (assignment_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/support/add', {
            jwt,
            assignment_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteEncounterAssignmentSupport = (support_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/support/delete', {
            jwt,
            support_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterAssignmentSupportCharacter = (support_id, character_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/support/update/character', {
            jwt,
            support_id,
            character_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterAssignmentSupportHeal = (support_id, heal) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/support/update/heal', {
            jwt,
            support_id,
            heal
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterAssignmentSupportDispel = (support_id, dispel) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/support/update/dispel', {
            jwt,
            support_id,
            dispel
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterAssignmentSupportDecurse = (support_id, decurse) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/assignment/support/update/decurse', {
            jwt,
            support_id,
            decurse
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const addEncounterHealer = (encounter_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/healer/add', {
            jwt,
            encounter_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const deleteEncounterHealer = (healer_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/healer/delete', {
            jwt,
            healer_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterHealerCharacter = (healer_id, character_id) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/healer/update/character', {
            jwt,
            healer_id,
            character_id
        })
        .then(result => {
            resolve(true)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const updateEncounterHealerTask = (healer_id, task) => {
    const jwt = Cookies.get('token')
    return new Promise( (resolve, reject) => {
        axios.post('https://professionality-api.com/encounters/healer/update/task', {
            jwt,
            healer_id,
            task
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
    getEncounters,
    addEncounter,
    deleteEncounter,
    addEncounterAssignment,
    deleteEncounterAssignment,
    updateEncounterAssignmentMarker,
    updateEncounterAssignmentTask,
    updateEncounterAssignmentCharacter,
    addEncounterAssignmentSupport,
    deleteEncounterAssignmentSupport,
    updateEncounterAssignmentSupportCharacter,
    updateEncounterAssignmentSupportHeal,
    updateEncounterAssignmentSupportDispel,
    updateEncounterAssignmentSupportDecurse,
    addEncounterHealer,
    deleteEncounterHealer,
    updateEncounterHealerCharacter,
    updateEncounterHealerTask
}
