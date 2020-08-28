import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 100vh;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.color};
`

const Wrapper = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default Wrapper
