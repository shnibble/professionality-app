import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import styled from 'styled-components'
import UserContext from '../../context/user'
import Article from '../article'
import AddInventory from './addInventory'
import TableWrapper from '../tableWrapper'
import Table from './table'
import InventoryItem from './inventoryItem'
import Popout from '../popout'

const EditTable = styled.table`
    width: 100%;

    & tbody > tr > td:nth-child(1) {
        width: 75px;
        text-align: right;
    }

    & tbody > tr > td:nth-child(2) {
        text-align: left;
    }
`
const Field = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const Select = styled.select`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const SubmitButton = styled.button`
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`
const CancelButton = styled.button`
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`

class Inventory extends React.Component {
    state = {
        loading: true,
        error: false,
        inventory: [],
        edit_active: false,
        edit_id: '',
        edit_category_id: '',
        edit_name: ''
    }

    loadData = () => {
        axios.get('https://professionality-api.com/bank/inventory/get')
        .then(results => {
            this.setState({
                loading: false,
                inventory: results.data
            })
        })
        .catch(err => {
            this.setState({
                loading: false,
                error: true
            })
        })
    }

    editInventoryItem = (ev) => {
        const data = JSON.parse(ev.target.value)

        this.setState({ 
            edit_active: true,
            edit_id: data.id,
            edit_category_id: data.category_id,
            edit_name: data.name
        })
    }

    cancelEditInventoryItem = () => {
        this.setState({
            edit_active: false,
            edit_id: '',
            edit_category_id: '',
            edit_name: ''
        })
    }

    handleEditInventoryCategory = (ev) => {
        const category_id = ev.target.value
        this.setState({ edit_category_id: category_id })
    }

    updateInventoryItem = () => {
        axios.post('https://professionality-api.com/bank/inventory/update', {
            jwt: Cookies.get('token'),
            inventory_id: this.state.edit_id,
            category_id: this.state.edit_category_id
        })
        .then(() => {
            this.setState({
                edit_active: false,
                edit_id: '',
                edit_category_id: '',
                edit_name: ''
            })
            this.loadData()
        })
        .catch(err => {
            window.alert('Issue updating inventory item, please try re-logging.')
        })
    }

    deleteInventoryItem = (ev) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.post('https://professionality-api.com/bank/inventory/delete', {
                jwt: Cookies.get('token'),
                inventory_id: ev.target.value
            })
            .then(() => {
                this.loadData()
            })
            .catch(err => {
                window.alert('Issue deleting inventory item, please try re-logging.')
            })
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    (this.state.error)
                    ?
                    <Article>
                        <p>Error loading inventory.</p>
                    </Article>
                    :
                    (this.state.loading)
                    ?
                    <Article>
                        <p>Loading bank inventory...</p>
                    </Article>
                    :
                    <Article>
                        {(user.is_officer)
                        ?
                        <AddInventory loadDataFunction={this.loadData} />
                        :
                        null
                        }
                        <TableWrapper>
                            <Table>
                            {this.state.inventory.map(item => <InventoryItem key={`inventory_item_id_${item.id}`} data={item} editItemFunction={this.editInventoryItem} deleteItemFunction={this.deleteInventoryItem} /> )}
                            </Table>
                        </TableWrapper>
                        {(this.state.edit_active)
                        ?
                        <Popout>
                            <h4>Edit Inventory</h4>
                            <EditTable>
                                <tbody>
                                    <tr>
                                        <td>ID:</td>
                                        <td>
                                            <Field type='number' value={this.state.edit_id} disabled />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Name:</td>
                                        <td>
                                            <Field type='text' value={this.state.edit_name} disabled />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Category:</td>
                                        <td>
                                            <Select value={this.state.edit_category_id} onChange={this.handleEditInventoryCategory}>
                                                <option value={1}>Misc.</option>
                                                <option value={2}>Recipes</option>
                                                <option value={3}>Trade Goods</option>
                                                <option value={4}>Equipment</option>
                                            </Select>
                                        </td>
                                    </tr>
                                </tbody>
                            </EditTable>
                            <div>
                                <SubmitButton onClick={this.updateInventoryItem}>Update</SubmitButton>
                                <CancelButton onClick={this.cancelEditInventoryItem}>Cancel</CancelButton>
                            </div>
                        </Popout>
                        :
                        null
                        }
                    </Article>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Inventory
