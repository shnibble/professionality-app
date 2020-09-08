import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 100vh;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.color};
    margin-top: 50px;
    margin-left: 0;
    
    @media screen and (min-width: 720px) {
        margin-top: 0;
        margin-left: 50px;
    }
`

const Wrapper = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default Wrapper
