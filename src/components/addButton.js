import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    display: block;
    background: none;
    border: none;
    color: #999;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
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

const AddButton = ({ title='', onClick=null, disabled=false }) => (
    <Container onClick={onClick} disabled={disabled}>
        {title}
    </Container>
)

export default AddButton
