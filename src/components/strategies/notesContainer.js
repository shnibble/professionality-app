import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 10px;
`
const Notes = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (min-width: 720px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const NotesContainer = ({ children }) => (
    <Container>
        <h5>Notes</h5>
        <Notes>
            {children}
        </Notes>
    </Container>
)

export default NotesContainer
