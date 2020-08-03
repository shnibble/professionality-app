import React from 'react'
import styled from 'styled-components'
import { getItems } from '../../services/items'
import { addInventory } from '../../services/inventory'
import Popout from '../popout'
import AddButton from '../addButton'
import SubmitButton from '../submitButton'
import CancelButton from '../cancelButton'

const Field = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const Select = styled.select`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`

class AddInventory extends React.Component {
    state = {
        active: false,
        updating: false,
        search: '',
        items: [],
        selected_item_id: '',
        selected_item_name: '',
        selected_item_quality: '',
        selected_item_icon: '',
        selected_item_category: 1,
        selected_item_random_enchantment: '',
    }

    searchTimeout = null
    
    openAddInventory = () => {
        this.setState({ active: true })
    }

    closeAddInventory = () => {
        this.setState({ 
            active: false,
            search: '',
            items: [],
            selected_item_id: '',
            selected_item_name: '',
            selected_item_quality: '',
            selected_item_icon: '',
            selected_item_category: 1,
            selected_item_random_enchantment: '',
        })
    }

    updateSearchField = (ev) => {
        const search = ev.target.value
        this.setState({ search })

        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(this.handleGetItems, 1000)
    }

    handleGetItems = () => {
        this.setState({ updating: true })
        getItems(this.state.search)
        .then(results => {
            this.setState({ 
                updating: false, 
                items: results.data 
            })
            if (results.data.length > 0) {
                document.getElementById('select_item_id').focus()
            }
        })
        .catch(err => {
            this.setState({ 
                items: [], 
                updating: false
            })
            window.alert('Issue loading items, please try re-logging.')
        })
    }

    selectItem = (ev) => {
        const item_id = ev.target.value
        if (item_id) {
            const data = JSON.parse(ev.target.options[ev.target.options.selectedIndex].getAttribute('data'))
            this.setState({ 
                selected_item_id: item_id,
                selected_item_name: data.name,
                selected_item_quality: data.quality,
                selected_item_icon: data.icon
            })
        } else {
            this.setState({
                selected_item_id: '',
                selected_item_name: '',
                selected_item_quality: '',
                selected_item_icon: ''
            })
        }
    }

    selectCategory = (ev) => {
        const category_id = ev.target.value
        this.setState({ selected_item_category: category_id })
    }

    updateRandomEnchantment = (ev) => {
        const random_enchantment = ev.target.value
        this.setState({ selected_item_random_enchantment: random_enchantment })
    }

    handleAddInventory = () => {
        this.setState({ updating: true })
        const { selected_item_id, selected_item_name, selected_item_quality, selected_item_icon, selected_item_category, selected_item_random_enchantment } = this.state
        if (selected_item_id === '' || selected_item_name === '' || selected_item_quality === '' || selected_item_icon === '') {
            window.alert('Please select a valid inventory item first.')
            this.setState({ updating: false })
        } else {
            addInventory(selected_item_id, selected_item_name, selected_item_quality, selected_item_icon, selected_item_category, selected_item_random_enchantment)
            .then(() => {
                this.setState({ 
                    active: false,
                    updating: false,
                    search: '',
                    items: [],
                    selected_item_id: '',
                    selected_item_name: '',
                    selected_item_quality: '',
                    selected_item_icon: '',
                    selected_item_category: 1,
                    selected_item_random_enchantment: '',
                })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding bank inventory item, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    render() {
        return (
            <>
                <AddButton title='Add Inventory' onClick={this.openAddInventory} disabled={this.state.updating} />
                {(this.state.active)
                ?
                <Popout submitFunction={this.handleAddInventory} cancelFunction={this.closeAddInventory} disabled={this.state.updating}>
                    <h4>Add Inventory</h4>
                    <Field value={this.state.search} onChange={this.updateSearchField} placeholder='Search' autoFocus />
                    <Select value={this.state.selected_item_id} onChange={this.selectItem} id='select_item_id'>
                        <option></option>
                        {this.state.items.map(item => <option key={`item_select_id_${item.id}`} value={item.item_id} data={JSON.stringify({
                            item_id: item.item_id,
                            name: item.name,
                            quality: item.quality,
                            icon: item.icon
                        })}>{item.name}</option> )}
                    </Select>
                    <Select value={this.state.selected_item_category} onChange={this.selectCategory}>
                        <option value={1}>Misc.</option>
                        <option value={2}>Recipes</option>
                        <option value={3}>Trade Goods</option>
                        <option value={4}>Equipment</option>
                    </Select>
                    <Field value={this.state.selected_item_random_enchantment} onChange={this.updateRandomEnchantment} placeholder='Random Enchantment' />
                    <div>
                        <input type='text' value={this.state.selected_item_name} disabled />
                        <br />
                        <input type='text' value={this.state.selected_item_quality} disabled />
                        <br />
                        <input type='text' value={this.state.selected_item_icon} disabled />
                    </div>
                </Popout>
                :
                null
                }
            </>
        )
    }
}

export default AddInventory
