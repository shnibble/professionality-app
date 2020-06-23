import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    display: inline-block;
    background: #f88000;
    border: 2px solid #f88000;
    color: #f2f2f2;
    padding: 2px;
    margin: 2px;
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
        color: #f88000;
    }

    &:disabled {
        background: #ccc;
        color: #999999;
        border-color: #ccc;
        cursor: default;
    }
`
const Checkmark = styled.div`
    width: 20px;
    height: 20px;
    position: relative;

    & > div {
        position: absolute;
        background: green;

        &:nth-child(1) {
            width: 4px;
            height: 8px;
            top: 9px;
            left: 5px;
            transform: rotate(-50deg);
        }

        &:nth-child(2) {
            width: 4px;
            height: 12px;
            top: 4px;
            left: 10px;
            transform: rotate(40deg);
        }
    }
`

const AddButton = ({ title='', onClick=null, disabled=false, active=false, value=null }) => (
    <Container onClick={onClick} disabled={disabled} value={value}>
        {title}
        {(active)
        ?
        <Checkmark>
            <div /><div />
        </Checkmark>
        :
        null
        }
    </Container>
)

export default AddButton
