import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 10px;
`
const Abilities = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (min-width: 720px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const AbilityContainer = ({ children }) => (
    <Container>
        <h5>Abilities</h5>
        <Abilities>
            {children}
        </Abilities>
    </Container>
)

export default AbilityContainer
