import React from 'react'
import styled from 'styled-components'
import DiscordLogo from '../../images/discord-logo.png'

const Container = styled.a`
    display: inline-block;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: all .25s ease;
    border-radius: 4px;

    &:hover {
        background: #2c2f33;
    }
`
const Logo = styled.img`
    width: 30px;
    height: 30px;
`
const Text = styled.span`
    color: #7289da;
    font-weight: bold;
`

const DiscordLink = ({ data }) => (
    <Container target='_BLANK' href={`https://discordapp.com/users/${data.discord_user_id}`}>
        <Logo src={DiscordLogo} />
        <Text>Profile</Text>
    </Container>
)

export default DiscordLink
