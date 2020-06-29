import React from 'react'
import styled from 'styled-components'
import UserContext from '../../context/user'
import TableButtonWrapper from '../tableButtonWrapper'
import TableButton from '../tableButton'

const Container = styled.div`
    background: #202020;
    padding: 10px;
    border-radius: 4px;
    margin: 5px;
`
const Title = styled.h3`
    color: #f2f2f2;
`
const Body = styled.div`
    display: flex;
    flex-direction: row;
    color: #f2f2f2;
`
const Description = styled.div`
    flex-grow: 1;
    padding: 5px;
`
const Reward = styled.div`
    flex-grow: 0;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const Goal = ({ data, openPopoutFunction, deleteGoalFunction }) => (
    <UserContext.Consumer>
        {user => (
            <Container>
                <Title>{data.title}</Title>
                <Body>
                    <Description>
                        <p>{data.description}</p>
                    </Description>
                    {(data.ep_reward)
                    ?
                    <Reward>
                        <h4>EP Reward</h4>
                        <p>{data.ep_reward}</p>
                    </Reward>
                    :
                    null
                    }
                </Body>
                {(user.is_officer)
                ?
                <TableButtonWrapper>
                    <TableButton title='Edit' value={JSON.stringify({
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        ep_reward: data.ep_reward
                    })} onClick={openPopoutFunction} />
                    <TableButton title='Delete' value={data.id} onClick={deleteGoalFunction} />
                </TableButtonWrapper>
                :
                null
                }
            </Container>
        )}
    </UserContext.Consumer>
)

export default Goal
