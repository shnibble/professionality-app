import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Popout from '../popout'
import AddButton from '../addButton'

const parser = require('fast-xml-parser')
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

class AddInventory extends React.Component {
    state = {
        active: false,
        search: '',
        items: [],
        selected_item_id: '',
        selected_item_name: '',
        selected_item_quality: '',
        selected_item_icon: ''
    }

    searchTimeout = null
    
    openAddInventory = () => {
        this.setState({ active: true })
    }

    closeAddInventory = () => {
        this.setState({ active: false, search: '', items: [] })
    }

    updateSearchField = (ev) => {
        const search = ev.target.value
        this.setState({ search })

        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(this.getItems, 1000)
    }

    getItems = () => {
        axios.get('https://professionality-api.com/items/get', {
            params: {
                search: this.state.search
            }
        })
        .then(results => {
            this.setState({ items: results.data })
        })
        .catch(err => {
            this.setState({ items: [] })
            window.alert('Issue loading items, please try re-logging.')
        })
    }

    selectItem = (ev) => {
        const item_id = ev.target.value
        const data = JSON.parse(ev.target.options[ev.target.options.selectedIndex].getAttribute('data'))
        this.setState({ 
            selected_item_id: item_id,
            selected_item_name: data.name,
            selected_item_quality: data.quality,
            selected_item_icon: data.icon
        })
    }

    addNewInventory = () => {
        const { selected_item_id, selected_item_name, selected_item_quality, selected_item_icon } = this.state

        if (selected_item_id === '' || selected_item_name === '' || selected_item_quality === '' || selected_item_icon === '') {
            window.alert('Please select a valid inventory item first.')
        } else {
            axios.post('https://professionality-api.com/bank/inventory/add', {
                jwt: Cookies.get('token'),
                item_id: selected_item_id,
                name: selected_item_name,
                quality: selected_item_quality,
                icon: selected_item_icon
            })
            .then(() => {
                this.setState({ active: false })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Error adding bank inventory item, please try re-logging.')
            })
        }
    }

    render() {
        return (
            <>
                <AddButton title='Add Inventory' onClick={this.openAddInventory} />
                {(this.state.active)
                ?
                <Popout>
                    <h4>Add Inventory</h4>
                    <Field value={this.state.search} onChange={this.updateSearchField} placeholder='Search' />
                    <Select value={this.state.selected_item_id} onChange={this.selectItem}>
                        <option></option>
                        {this.state.items.map(item => <option key={`item_select_id_${item.id}`} value={item.item_id} data={JSON.stringify({
                            item_id: item.item_id,
                            name: item.name,
                            quality: item.quality,
                            icon: item.icon
                        })}>{item.name}</option> )}
                    </Select>
                    <div>
                        <input type='text' value={this.state.selected_item_name} disabled />
                        <br />
                        <input type='text' value={this.state.selected_item_quality} disabled />
                        <br />
                        <input type='text' value={this.state.selected_item_icon} disabled />
                    </div>
                    <div>
                        <SubmitButton onClick={this.addNewInventory}>Add</SubmitButton>
                        <CancelButton onClick={this.closeAddInventory}>Cancel</CancelButton>
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
