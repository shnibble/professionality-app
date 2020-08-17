import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    display: block;
    background: none;
    border: none;
    color: #999;
    padding: 5px;
    margin: 2px;
    font-size: 13px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: #f88000;
    }

    &:disabled {
        color: #ccc;
    }
`

const AddButtonSmall = ({ title='', onClick=null, disabled=false }) => (
    <Container onClick={onClick} disabled={disabled}>
        {title}
    </Container>
)

export default AddButtonSmall
