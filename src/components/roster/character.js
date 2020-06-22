import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: inline-block;
    margin: 2px;
    padding: 2px;
    border-radius: 4px;
    text-align: center;
    background: #202020;
    border: 1px solid #606060;

    &.class-1 {
        color: #C79C6E;
    }
    &.class-2 {
        color: #F58CBA;
    }
    &.class-3 {
        color: #ABD473;
    }
    &.class-4 {
        color: #FFF569;
    }
    &.class-5 {
        color: #FFFFFF;
    }
    &.class-8 {
        color: #69CCF0;
    }
    &.class-9 {
        color: #9482C9;
    }
    &.class-11 {
        color: #FF7D0A;
    }
`

const Character = ({ data }) => (
    <Container className={`class-${data.class_id}`}>
        {data.name}
    </Container>
)

export default Character
