import React from 'react'
import styled from 'styled-components'

const Container = styled.table`
    border-collapse: collapse;
    text-align: center;
    width: 100%;

    & tr > th, & tr > td {
        padding: 5px;
    }

    & tbody > tr:nth-child(odd) {
        background: #f2f2f2;
    }
`

const Table = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default Table
