import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 10px;
`
const Mechanics = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (min-width: 720px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const MechanicsContainer = ({ children }) => (
    <Container>
        <h5>Mechanics</h5>
        <Mechanics>
            {children}
        </Mechanics>
    </Container>
)

export default MechanicsContainer
