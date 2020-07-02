import React from 'react'
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
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 250px;
`

const Item = ({ data }) => (
    <Container>
        <ItemTd>
            <Icon src={`https://wow.zamimg.com/images/wow/icons/large/${data.icon}.jpg`} className={`quality-${data.quality}`} />
            <Title className={`quality-${data.quality}`} href={`https://classic.wowhead.com/item=${data.item_id}`} target='_BLANK'>{data.name}</Title>
        </ItemTd>
        <td><span>{data.dropped_by}</span></td>
        <td><p>{data.priority}</p></td>
        <td><p>{data.comments}</p></td>
    </Container>
)

export default Item
