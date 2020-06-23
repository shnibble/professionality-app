import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const TableButtonWrapper = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default TableButtonWrapper
