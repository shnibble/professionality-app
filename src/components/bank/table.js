import React from 'react'
import styled from 'styled-components'

const Container = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: #ccc;

    & > thead > tr > th {
        padding: 5px;
        color: #000;
    }

    & > tbody > tr > td {
        padding: 2px;
    }

    & > tbody > tr:nth-child(odd) {
        background: #333333;
    }

    & > tbody > tr:nth-child(even) {
        background: #202020;
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
