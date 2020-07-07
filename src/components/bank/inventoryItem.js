import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import UserContext from '../../context/user'
import TableButtonWrapper from '../tableButtonWrapper'
import TableButton from '../tableButton'

const Container = styled.tr`

`
const Icon = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #9d9d9d;
    margin-right: 5px;

    &.quality-Poor {
        border-color: #9d9d9d;
    }
    &.quality-Common {
        border-color: #ffffff;
    }
    &.quality-Uncommon {
        border-color: #1eff00;
    }
    &.quality-Rare {
        border-color: #0070dd;
    }
    &.quality-Epic {
        border-color: #a335ee;
    }
    &.quality-Legendary {
        border-color: #ff8000;
    }
`
const Title = styled.span`
    color: #9d9d9d;

    &.quality-Poor {
        color: #9d9d9d;
    }
    &.quality-Common {
        color: #ffffff;
    }
    &.quality-Uncommon {
        color: #1eff00;
    }
    &.quality-Rare {
        color: #0070dd;
    }
    &.quality-Epic {
        color: #a335ee;
    }
    &.quality-Legendary {
        color: #ff8000;
    }
`
const ItemTd = styled.td`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 250px;
    cursor: pointer;
`
const Tooltip = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
    background: #202020;
    border-radius: 4px;
    border: 1px solid #f2f2f2;
    max-width: 50vw;  
    max-width: 300px;  
    z-index: 2;
    color: #fff;
    padding: 2px;
    font-size: 12px;
    text-decoration: none;

    & a {
        text-decoration: none;
        color: #fff;

        & .q0 span a {
            color: #9d9d9d;
        }

        & span.q {
            color: #ffd100;
        }

        & span.q2 {
            color: #1eff00;

            & > a {
                color: #1eff00;
            }
        }

        & .c1 {
            color: #C79C6E;
        }
        & .c2 {
            color: #F58CBA;
        }
        & .c3 {
            color: #ABD473;
        }
        & .c4 {
            color: #FFF569;
        }
        & .c5 {
            color: #FFFFFF;
        }
        & .c8 {
            color: #69CCF0;
        }
        & .c9 {
            color: #9482C9;
        }
        & .c11 {
            color: #FF7D0A;
        }

        & .q0 {
            color: #9d9d9d;
        }
        & .q1 {
            color: #ffffff;
        }
        & .q2 {
            color: #1eff00;
        }
        & .q3 {
            color: #0070dd;
        }
        & .q4 {
            color: #a335ee;
        }
        & .q5 {
            color: #ff8000;
        }
    }

    & .moneygold:after {
        content: '';
        display: inline-block;
        margin-left: 2px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: gold;
    }
    & .moneysilver:after {
        content: '';
        display: inline-block;
        margin-left: 2px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: silver;
    }
    & .moneycopper:after {
        content: '';
        display: inline-block;
        margin-left: 2px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #ff751a;
    }
`
const ItemCategory = styled.p`
    text-align: center;
`

class Item extends React.Component {
    state = {
        hover: false,
        loading: false,
        loaded: false,
        error: false,
        tooltip: ''
    }

    loadData = () => {
        this.setState({ loading: true })
        axios.get('https://professionality-api.com/items/getDetails', {
            params: {
                item_id: this.props.data.item_id
            }
        })
        .then(response => {
            const tooltip = response.data.wowhead.item.htmlTooltip
            this.setState({ loading: false, loaded: true, tooltip })
        })
        .catch(err => {
            this.setState({ loading: false, loaded: false, error: true })
        })
    }

    handleMouseEnter = () => {
        this.setState({ hover: true })
        if (!this.state.loading && !this.state.loaded && !this.state.error) {
            this.loadData()
        }
    }

    handleMouseLeave = () => {
        this.setState({ hover: false })
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    <Container>
                        <ItemTd onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
                            <Icon src={`https://wow.zamimg.com/images/wow/icons/large/${this.props.data.icon}.jpg`} className={`quality-${this.props.data.quality}`} />
                            <Title className={`quality-${this.props.data.quality}`}>{this.props.data.name}</Title>
                            {(this.state.hover)
                            ?
                            <Tooltip>
                                {(this.state.error)
                                ?
                                <p>Error loading tooltip.</p>
                                :
                                (this.state.loading)
                                ?
                                <p>Loading tooltip...</p>
                                :
                                (this.state.loaded)
                                ?
                                <a dangerouslySetInnerHTML={{__html: this.state.tooltip}} href={`https://classic.wowhead.com/item=${this.props.data.item_id}`} target='_BLANK' rel='noopener noreferrer' />
                                :
                                null
                                }
                            </Tooltip>
                            :
                            null
                            }
                        </ItemTd>
                        <td><ItemCategory>{this.props.data.category_name}</ItemCategory></td>
                        {(user.is_officer)
                        ?
                        <td>
                            <TableButtonWrapper>
                            <TableButton title='Edit' value={JSON.stringify(this.props.data)} onClick={this.props.editItemFunction} />
                            <TableButton title='Delete' value={this.props.data.id} onClick={this.props.deleteItemFunction} />
                            </TableButtonWrapper>
                        </td>
                        :
                        null
                        }
                    </Container>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Item
