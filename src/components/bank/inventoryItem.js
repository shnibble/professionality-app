import React from 'react'
import styled from 'styled-components'
import UserContext from '../../context/user'

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 200px;
    flex-direction: row;
    background: #202020;
    margin: 5px;
    padding: 5px;
    border-radius: 4px;
    text-decoration: none;
`
const IconContainer = styled.div`
    display: inline-block;
    border: 1px solid #9d9d9d;
    border-radius: 4px;

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
const Icon = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 4px;
`
const Title = styled.a`
    color: #9d9d9d;
    margin: 5px;
    font-size: 12px;
    
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
const DeleteButton = styled.button`
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: red;
    color: #fff;
    border: 2px solid red;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: #fff;
        color: red;
    }
    &:focus {
        outline: none;
    }
`

const InventoryItem = ({ data, deleteItemFunction }) => (
    <UserContext.Consumer>
        {user => (
            <Container>
                <IconContainer className={`quality-${data.quality}`}>
                    <Icon src={`https://wow.zamimg.com/images/wow/icons/large/${data.icon}.jpg`} alt={data.icon} />
                </IconContainer>
                <Title href={`https://classic.wowhead.com/item=${data.item_id}`} target='_BLANK' className={`quality-${data.quality}`}>{data.name}</Title>
                {(user.is_officer)
                ?
                <DeleteButton value={data.id} onClick={deleteItemFunction}>X</DeleteButton>
                :
                null
                }
            </Container>
        )}
    </UserContext.Consumer>
)

export default InventoryItem
