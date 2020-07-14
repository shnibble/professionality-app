import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 720px) {
        flex-direction: row-reverse;
        align-items: center;
    }
`
const ImageContainer = styled.div`
    text-align: center;
    margin: 5px;
`
const Image = styled.img`
    height: 250px;
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
        <ImageContainer>
            <Image src={img}/>
        </ImageContainer>
        <Header>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Header>
    </Container>
)

export default Boss
