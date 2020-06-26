import React from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import axios from 'axios'
import UserContext from '../../context/user'
import Article from '../article'
import AddInventory from './addInventory'
import InventoryItem from './inventoryItem'

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
class Inventory extends React.Component {
    state = {
        loading: true,
        error: false,
        inventory: []
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

    deleteInventoryItem = (ev) => {
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
                        <ItemsContainer>
                            {this.state.inventory.map(item => <InventoryItem key={`inventory_item_id_${item.id}`} data={item} deleteItemFunction={this.deleteInventoryItem} /> )}
                        </ItemsContainer>
                    </Article>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Inventory
