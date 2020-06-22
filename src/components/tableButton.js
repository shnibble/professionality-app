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
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #f88000;
    }
`

const AddButton = ({ title='', onClick=null, disabled=false }) => (
    <Container onClick={onClick} disabled={disabled}>
        {title}
    </Container>
)

export default AddButton
