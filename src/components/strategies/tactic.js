import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background: #202020;
    border-radius: 5px;
    margin: 2px;
`
const Title = styled.h6`
    color: #ffd100;
    margin: 5px;
`
const Description = styled.p`
    color: #f2f2f2;
    font-size: 12px;
    margin: 5px;
`

const Tactic = ({ title='', description='No Description' }) => (
    <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
    </Container>
)

export default Tactic
