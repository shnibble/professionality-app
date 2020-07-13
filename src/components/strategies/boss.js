import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const Image = styled.img`
    width: 100px;
    margin: 5px;
`
const Header = styled.div`
`
const Title = styled.h3`

`
const Description = styled.p`
    padding: 5px;
`

const Boss = ({ img=null, title='', description='' }) => (
    <Container>
        <Image src={img}/>
        <Header>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Header>
    </Container>
)

export default Boss
