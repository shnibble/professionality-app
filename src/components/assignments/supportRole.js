import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    max-height: 30px;
`
const Button = styled.button`
    background: none;
    border: none;
    background-size: 100%;
    background-position: center;
    width: 30px;
    height: 30px;
    opacity: 0.25;
    cursor: pointer;
    transition: all .25s ease;

    &.active {
        opacity: 1;
    }

    &:focus {
        outline: none;
    }
`
const Image = styled.img`
    width: 30px;
    height: 30px;
    opacity: 0.5;
    transition: all .25s ease;

    &.active {
        opacity: 1;
    }
`

const SupportRole = ({ src, title, active, onClickFunction, edit }) => (
    <Container>
        {(edit)
        ?
        <Button className={(active)?'active':''}  value={!active} onClick={onClickFunction} style={{ backgroundImage: `url(${src})` }} title={title} />
        :
        (active)
        ?
        <Image src={src} className='active' title={title} />
        :
        null
        }
    </Container>
)

export default SupportRole
