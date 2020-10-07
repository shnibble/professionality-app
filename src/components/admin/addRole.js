import React, { useState } from 'react'
import styled from 'styled-components'
import Popout from '../popout'
import AddButton from '../addButton'
import { addRole } from '../../services/admin'

const Container = styled.div`

`
const Table = styled.table`
    width: 100%;
`
const Field = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`

const AddRole = ({ loadDataFunction }) => {
    const [active, setActive] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [name, setName] = useState('')
    
    const open = () => {
        setActive(true)
    }

    const close = () => {
        setActive(false)
    }

    const handleChangeName = (ev) => {
        const name = ev.target.value
        setName(name)
    }

    const handleSubmit = () => {
        setUpdating(true)

        if (name === '') {
            window.alert('Please enter a valid role name.')
            setUpdating(false)
        } else {
            addRole(name)
            .then(() => {
                setUpdating(false)
                setActive(false)
                loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding role, please try re-logging.')
                setUpdating(false)
            })
        }
    }

    return (
        <Container>
            <AddButton title='Add Role' onClick={open} />
            {(active)
            ?
            <Popout submitFunction={handleSubmit} cancelFunction={close} disabled={updating}>
                <h4>Add Role</h4>
                <Table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <Field type='text' value={name} onChange={handleChangeName} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Popout>
            :
            null
            }
        </Container>
    )
}

export default AddRole
