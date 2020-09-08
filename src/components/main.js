import React from 'react'
import styled from 'styled-components'

const Container = styled.main`
    margin: auto;
    max-width: 1000px;
    padding: 10px;
    min-height: 100vh;

    @media screen and (min-width: 720px) {
        margin: auto;
    }
`

const Main = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default Main
