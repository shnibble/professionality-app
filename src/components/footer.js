import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
    padding: 15px;
    background: #24292e;
    text-align: center;
`
const P = styled.p`
    color: #f2f2f2;
    font-size: 12px;
`
const GithubLink = styled.a`
    color: #f5f0ff;
`

const Footer = () => (
    <Container>
        <P>professionality.app is created and maintained by <GithubLink href='https://github.com/shnibble' target='_blank'>Shnibble</GithubLink></P>
        <P>copyright {new Date().getFullYear()}</P>
    </Container>
)

export default Footer
