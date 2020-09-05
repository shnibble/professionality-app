import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import UserContext from '../../context/user'
import { applyDecay } from '../../services/pugepgp'
import Article from '../article'
import AddButton from '../addButton'
import TableWrapper from '../tableWrapper'
import AddPug from './addPug'
import ApplyEp from './applyEp'
import Pug from './pug'

const TopButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    text-align: center;

    & tbody > tr:nth-child(odd) {
        background: ${props => props.theme.colors.tableOddRowBackground};
    }
`

class PugTracker extends React.Component {
    state = {
        error: false,
        loading: true,
        active_pugs: [],
        inactive_pugs: []
    }

    loadData = () => {
        axios.get('https://professionality-api.com/pugepgp/get')
        .then(result => {
            const active_pugs = result.data.active
            const inactive_pugs = result.data.inactive
            this.setState({ loading: false, active_pugs, inactive_pugs })
        })
        .catch(error => {
            window.alert('Issue loading PUGs, please try refreshing the page.')
        })
    }

    decay = () => {
        if (window.confirm('Are you sure you want to apply decay to all PUG characters?')) {
            applyDecay()
            .then(() => {
                this.loadData()
            })
            .catch(err => {
                window.alert('Error applying decay, please try re-logging.')
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
                    <Article>
                        {(this.state.error)
                        ?
                        <p>Error loading data.</p>
                        :
                        (this.state.loading)
                        ?
                        <p>Loading PUG tracker...</p>
                        :
                        <>
                            {(user.is_officer)
                            ?
                            <TopButtonsContainer>
                                <AddPug loadDataFunction={this.loadData} />
                                <ApplyEp loadDataFunction={this.loadData} />
                                <AddButton title='Apply Decay' onClick={this.decay} />
                            </TopButtonsContainer>
                            :
                            null
                            }
                            <h3>Active</h3>
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Character</th>
                                            <th>EP</th>
                                            <th>GP</th>
                                            <th>PR</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(this.state.active_pugs.map(pug => <Pug key={`pug_id_${pug.id}`} data={pug} active={true} loadDataFunction={this.loadData} /> ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>
                            <br />
                            <h3>Inactive</h3>
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Character</th>
                                            <th>EP</th>
                                            <th>GP</th>
                                            <th>PR</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(this.state.inactive_pugs.map(pug => <Pug key={`pug_id_${pug.id}`} data={pug} active={false} loadDataFunction={this.loadData} /> ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>
                        </>
                        }
                    </Article>
                )}
            </UserContext.Consumer>
        )
    }
}

export default PugTracker
