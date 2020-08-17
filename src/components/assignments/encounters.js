import React from 'react'
import styled from 'styled-components'
import UserContext from '../../context/user'
import { getEncounters } from '../../services/encounters'
import { getActiveCharacters } from '../../services/character'
import Article from '../article'
import ViewEditToggle from './viewEditToggle'
import AddEncounter from './addEncounter'
import Encounter from './encounter'

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`

class Encounters extends React.Component {
    state = {
        loading: true,
        error: false,
        encounters: [],
        characters: [],
        edit: false
    }

    loadData = () => {
        getEncounters(this.props.instance_id)
        .then(results => {

            const encounters = results.data

            getActiveCharacters()
            .then(results => {
                const characters = results.data
                this.setState({ loading: false, encounters, characters })
            })
            .catch(err => {
                this.setState({ loading: false, error: true })
            })            
        })
        .catch(err => {
            this.setState({ loading: false, error: true })
        })
    }

    toggleEdit = () => {
        this.setState({ edit: !this.state.edit })
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
                        <p>Error loading encounters.</p>
                    </Article>
                    :
                    (this.state.loading)
                    ?
                    <Article>
                        <p>Loading encounters...</p>
                    </Article>
                    :
                    <>
                        {(user.is_officer)
                        ?
                        <ButtonsContainer>
                            <div>
                                {(this.state.edit)
                                ?
                                <AddEncounter loadDataFunction={this.loadData} instance_id={this.props.instance_id} />
                                :
                                null
                                }
                            </div>
                            <div>
                                <ViewEditToggle onClickFunction={this.toggleEdit} active={this.state.edit} />
                            </div>
                        </ButtonsContainer>
                        :
                        null
                        }
                        {this.state.encounters.map(encounter => (
                            <Encounter key={`encounter_${encounter.id}`} data={encounter} characters={this.state.characters} loadDataFunction={this.loadData} edit={this.state.edit} />
                        ))}
                    </>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Encounters
