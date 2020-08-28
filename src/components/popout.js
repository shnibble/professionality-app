import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 3;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colors.background};
    max-width: 400px;
    height: 60vh;
    margin: 20vh auto;
    min-height: 200px;
`
const ChildContainer = styled.div`
    text-align: center;
    padding: 15px;
    overflow-y: auto;
    flex-grow: 1;
`
const ButtonContainer = styled.div`
    height: 50px;
`
const Button = styled.button`
    display: inline-block;
    width: 50%;
    box-sizing: border-box;
    height: 100%;
    border: none;
    color: #999;
    background: none;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        background: #f88000;
        color: #fff;
    }

    &:disabled {
        background: #ccc;
        color: #f2f2f2;
        cursor: not-allowed;
    }
`

const Popout = ({ children, submitFunction=null, cancelFunction=null, disabled=false }) => (
    <Container>
        <Box>
            <ChildContainer>
                {children}
            </ChildContainer>
            <ButtonContainer>
                <Button onClick={submitFunction} disabled={disabled}>Submit</Button>
                <Button onClick={cancelFunction} disabled={disabled}>Cancel</Button>
            </ButtonContainer>
        </Box>
    </Container>
)

export default Popout
