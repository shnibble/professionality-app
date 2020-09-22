import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 100vh;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.color};
    margin-left: 50px;
    transition: all .25s ease;
    
    &.open {
        margin-left: 200px;
    }
`

const Wrapper = ({ menuOpen, children }) => (
    <Container className={(menuOpen)?'open':''}>
        {children}
    </Container>
)

export default Wrapper
