import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background: #202020;
    border-radius: 5px;
    margin: 2px;
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
`
const Header = styled.div`
    margin: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 2px;
    width: 100%;
`
const Title = styled.h3`
    color: #ffd100;
    font-size: 12px;
`
const Description = styled.p`
    color: #f2f2f2;
    font-size: 10px;
`

const Ability = ({ img=null, title='Unknown Ability', description='No Description' }) => (
    <Container>
        <Image src={img} />
        <Header>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Header>
    </Container>
)

export default Ability
