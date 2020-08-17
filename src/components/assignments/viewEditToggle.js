import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background: #3399ff;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`
const Label = styled.span`
    color: #fff;
    padding: 0 10px;
`
const Slider = styled.div`
    position: absolute;
    left: 2px;
    top: 2px;
    height: 26px;
    width: 46px;
    border-radius: 10px;
    background: #f2f2f2;
    transition: all .25s ease;

    &.active {
        left: 52px;
    }
`

const ViewEditToggle = ({ onClickFunction, active }) => (
    <Container onClick={onClickFunction} title='Toggle view/edit mode'>
        <Label>Edit</Label>
        <Label>View</Label>
        <Slider className={(active)?'active':''} />
    </Container>
)

export default ViewEditToggle
