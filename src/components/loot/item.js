import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Moment from 'moment'
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
const HistoryButton = styled.button`
    background: orange;
    color: #fff;
    border: none;
    padding: 2px;
    margin: 2px;
    border: 1px solid orange;
    border-radius: 4px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        background: #fff;
        color: orange;
    }
`
const HistoryContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.75);
    z-index: 3;
`
const History = styled.div`
    background: ${props => props.theme.colors.background};
    font-size: 12px;
    padding: 5px;
    margin: 5px;
    border-radius: 4px;
`
const HistoryTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    & tbody tr:nth-child(odd) {
        background: ${props => props.theme.colors.tableOddRowBackground};
    }

    & td {
        padding: 2px;
    }

    & td:nth-child(1) {
        width: 120px;
    }
`
const CloseHistoryButton = styled.button`
    display: inline-block;
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 2px;
    margin: 2px auto;
    border-radius: 4px;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`

class Item extends React.Component {
    state = {
        hover: false,
        loading: false,
        loaded: false,
        error: false,
        tooltip: '',
        history: false,
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

    openHistory = () => {
        this.setState({ history: true })
    }

    closeHistory = () => {
        this.setState({ history: false })
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
                        <td><span>{this.props.data.dropped_by}</span></td>
                        <td>
                            <span>{this.props.data.priority}</span>
                            {(this.props.data.history.length)?<HistoryButton title='History' onClick={this.openHistory}>H</HistoryButton>:null}
                            {(this.state.history)
                            ?
                            <HistoryContainer>
                                <History>
                                    <HistoryTable>
                                        <thead>
                                            <tr>
                                                <th>Timestamp</th>
                                                <th>User</th>
                                                <th>Previous Priority</th>
                                                <th>New Priority</th>
                                                <th>Previous Comments</th>
                                                <th>New Comments</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.props.data.history.map(h => (
                                                <tr key={`history_id_${h.id}`}>
                                                    <td>{Moment(h.timestamp).format('MM/DD/YYYY HH:mm:ss')}</td>
                                                    <td>{h.nickname}</td>
                                                    <td>{h.previous_priority}</td>
                                                    <td>{h.new_priority}</td>
                                                    <td>{h.previous_comments}</td>
                                                    <td>{h.new_comments}</td>
                                                </tr>
                                            )))}
                                        </tbody>
                                    </HistoryTable>
                                    <CloseHistoryButton onClick={this.closeHistory}>Close</CloseHistoryButton>
                                </History>
                            </HistoryContainer>
                            :
                            null
                            }
                        </td>
                        <td><p>{this.props.data.comments}</p></td>
                        {(user.is_officer)
                        ?
                        <td>
                            <TableButtonWrapper>
                                <TableButton title='Edit' value={JSON.stringify({ id: this.props.data.id, priority: this.props.data.priority, comments: this.props.data.comments || ''})} onClick={this.props.editFunction} />
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
