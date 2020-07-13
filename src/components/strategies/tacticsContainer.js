import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 10px;
`
const Tactics = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (min-width: 720px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const TacticsContainer = ({ children }) => (
    <Container>
        <h5>Tactics</h5>
        <Tactics>
            {children}
        </Tactics>
    </Container>
)

export default TacticsContainer
