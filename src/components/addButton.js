import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    display: block;
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }

    &:disabled {
        background: #ccc;
        border-color: #ccc;
        color: #f2f2f2;
        cursor: not-allowed; 
    }
`

const AddButton = ({ title='', onClick=null, disabled=false }) => (
    <Container onClick={onClick} disabled={disabled}>
        {title}
    </Container>
)

export default AddButton
