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
const InnerContainer = styled.div`
    position: relative;
    background: #fff;
    max-width: 400px;
    height: 60vh;
    margin: 20vh auto;
    min-height: 200px;
    max-height: 300px;
    padding: 15px 15px 50px 15px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 4px;
`

const Popout = ({ children }) => (
    <Container>
        <InnerContainer>
            {children}
        </InnerContainer>
    </Container>
)

export default Popout
