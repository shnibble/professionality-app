import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
const Title = styled.a`
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
    z-index: 2;
    color: #fff;
    padding: 2px;

    & a {
        color: #1eff00;
    }
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
            <Container>
                <ItemTd onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
                    <Icon src={`https://wow.zamimg.com/images/wow/icons/large/${this.props.data.icon}.jpg`} className={`quality-${this.props.data.quality}`} />
                    <Title className={`quality-${this.props.data.quality}`} href={`https://classic.wowhead.com/item=${this.props.data.item_id}`} target='_BLANK'>{this.props.data.name}</Title>
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
                        <div dangerouslySetInnerHTML={{__html: this.state.tooltip}} />
                        :
                        null
                        }
                    </Tooltip>
                    :
                    null
                    }
                </ItemTd>
                <td><span>{this.props.data.dropped_by}</span></td>
                <td><p>{this.props.data.priority}</p></td>
                <td><p>{this.props.data.comments}</p></td>
            </Container>
        )
    }
}

export default Item
