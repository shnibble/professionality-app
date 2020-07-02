import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Article from '../article'
import TableWrapper from '../tableWrapper'
import Table from './table'
import Item from './item'

const SearchField = styled.input`
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`

class Ony extends React.Component {
    state = { 
        loading: true,
        error: false,
        search: '',
        loot: [],
        searchedLoot: []
    }

    updateSearch = (ev) => {
        const search = ev.target.value
        this.setState({ search })

        const searchedLoot = this.state.loot.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        this.setState({ searchedLoot })
    }

    loadData = () => {
        axios.get('https://professionality-api.com/loot/get', {
            params: {
                instance: 'Onyxia'
            }
        })
        .then(result => {
            this.setState({ 
                loading: false,
                loot: result.data,
                searchedLoot: result.data,
                search: ''
            })
        })
        .catch(err => {
            this.setState({
                error: true
            })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <Article>
                {(this.state.error)
                ?
                <p>Error loading loot.</p>
                :
                (this.state.loading)
                ?
                <p>Loading loot...</p>
                :
                <TableWrapper>
                    <SearchField type='text' value={this.state.search} onChange={this.updateSearch} placeholder='Search' />
                    <Table>
                        {this.state.searchedLoot.map(item => <Item key={`loot_item_${item.id}`} data={item} /> )}
                    </Table>
                </TableWrapper>
                }
            </Article>

        )
    }
}

export default Ony
