import React from 'react'
import styled from 'styled-components'

const Container = styled.article`
    margin: 50px 10px;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.25);
    padding: 10px;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.color};
`

const Article = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default Article
