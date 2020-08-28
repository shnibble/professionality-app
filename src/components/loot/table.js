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
        background: ${props => props.theme.colors.tableOddRowBackground};
    }
`

const Table = ({ children }) => (
    <Container>
        <thead>
            <tr>
                <th>Item</th>
                <th>Source</th>
                <th>Priority</th>
                <th>Comments</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </Container>
)

export default Table
