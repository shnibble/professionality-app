import React from 'react'
import styled from 'styled-components'

const Container = styled.table`
    width: 100%;
    border-collapse: collapse;

    & > thead > tr > th {
        padding: 5px;
    }

    & > tbody > tr > td {
        padding: 2px;
    }

    & > tbody > tr:nth-child(odd) {
        background: #f2f2f2;
    }
`

const Table = ({ children }) => (
    <Container>
        <thead>
            <tr>
                <th>Item</th>
                <th>Category</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </Container>
)

export default Table
