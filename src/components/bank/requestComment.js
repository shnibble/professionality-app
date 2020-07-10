import React from 'react'
import styled from 'styled-components'
import Moment from 'moment'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background: #999;
    margin: 1px;
    border-radius: 4px;
`
const Timestamp = styled.span`
    padding: 5px;
    color: #ccc;
`
const Username = styled.span`
    padding: 5px;
    color: #ccc;
`
const Message = styled.p`
    padding: 5px;
`

const RequestComment = ({ data }) => (
    <Container>
        <Timestamp>{Moment(data.timestamp).format('MM/DD/YYYY')}</Timestamp>
        <Username>{data.nickname}</Username>
        <Message>{data.message}</Message>
    </Container>
)

export default RequestComment
