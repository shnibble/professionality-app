import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    overflow-x: auto;
`

const TableWrapper = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default TableWrapper
