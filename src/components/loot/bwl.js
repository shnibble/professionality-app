import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Article from '../article'
import TableWrapper from '../tableWrapper'
import Table from './table'
import Item from './item'
import Popout from '../popout'
import Cookies from 'js-cookie'

const SearchField = styled.input`
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const EditTable = styled.table`
    width: 100%;
`
const EditField = styled.textarea`
    width: 100%;
    padding: 5px;
    font-size: 12px;
    height: 50px;
    box-sizing: border-box;
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

class Bwl extends React.Component {
    state = { 
        loading: true,
        error: false,
        search: '',
        loot: [],
        searchedLoot: [],
        edit: false,
        edit_id: '',
        edit_priority: '',
        edit_comments: ''
    }

    updateLoot = () => {
        axios.post('https://professionality-api.com/loot/update', {
            jwt: Cookies.get('token'),
            loot_id: this.state.edit_id,
            priority: this.state.edit_priority,
            comments: this.state.edit_comments
        })
        .then(() => {
            this.closeEditor()
            this.loadData()
        })
        .catch(err => {
            window.alert('Issue updating loot, please try re-logging.')
        })
    }

    openEditor = (ev) => {
        const data = JSON.parse(ev.target.value)
        this.setState({
            edit: true,
            edit_id: data.id,
            edit_priority: data.priority,
            edit_comments: data.comments
        })
    }

    closeEditor = () => {
        this.setState({
            edit: false,
            edit_id: '',
            edit_priority: '',
            edit_comments: ''
        })
    }

    updatePriority = (ev) => {
        const priority = ev.target.value
        this.setState({ edit_priority: priority })
    }

    updateComments = (ev) => {
        const comments = ev.target.value
        this.setState({ edit_comments: comments })
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
                instance: 'Blackwing Lair'
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
                        {this.state.searchedLoot.map(item => <Item key={`loot_item_${item.id}`} data={item} editFunction={this.openEditor} /> )}
                    </Table>
                </TableWrapper>
                }
                {(this.state.edit)
                ?
                <Popout>
                    <h4>Edit Loot</h4>
                    <EditTable>
                        <tbody>
                            <tr>
                                <td><b>Priority:</b></td>
                                <td><EditField value={this.state.edit_priority} onChange={this.updatePriority} /></td>
                            </tr>
                            <tr>
                                <td><b>Comments:</b></td>
                                <td><EditField value={this.state.edit_comments} onChange={this.updateComments} /></td>
                            </tr>
                        </tbody>
                    </EditTable>
                    <div>
                        <SubmitButton onClick={this.updateLoot}>Update</SubmitButton>
                        <CancelButton onClick={this.closeEditor}>Cancel</CancelButton>
                    </div>
                </Popout>
                :
                null
                }
            </Article>

        )
    }
}

export default Bwl
