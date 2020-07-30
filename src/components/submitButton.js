import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`

const SubmitButton = ({ title='Button', ...rest }) => (
    <Container {...rest}>{title}</Container>
)

export default SubmitButton
