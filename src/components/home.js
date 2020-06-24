import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Article from './article'

const Li = styled.li`
    margin-left: 50px;
`

const Home = () => (
    <section>
        <h2>Home</h2>
        <Article>
            <h3>About Professionality</h3>
            <p>Professionality is a leveling and raiding Classic World of Warcraft guild on the realm Deviate Delight. We consider ourselves casual so we don't try to break records or anything, just have fun and clear content as best we can without going crazy.</p>
        </Article>
        <Article>
            <h3>Discord</h3>
            <p>Feel free to join our Discord server, we don't bite: <a href='https://discord.gg/vth2bMj' target='_BLANK'>https://discord.gg/vth2bMj</a></p>
            <br />
            <p>Note that if you want to sign in to this website to utilize any of it's features, you must first join Discord so our Bot can identify you.</p>
        </Article>
        <Article>
            <h3>Raiding</h3>
            <h4>Atmosphere</h4>
            <ul>
                <Li><p>Enjoyment and fun are prioritized over speed and efficiency. That said, we will focus on understanding mechanics and paying attention, it's not very fun to get blown up when someone isn't watching the fight.</p></Li>
                <Li><p>Tribute and world buffs are encouraged for those who are able but not required or expected.</p></Li>
                <Li><p>Minimal consumables that are required for certain boss fights should be brought if possible but not required.</p></Li>
            </ul>
            <br />
            <h4>Schedule</h4>
            <ul>
                <Li><p>Progression raids occur Wednesdays at 8:30pm server time. This raid will change as the guild progresses to different content.</p></Li>
                <Li><p>Farming raids occur on Thursdays at 8:30pm server time. This raid will change as the guild progresses to different content.</p></Li>
            </ul>
            <br />
            <h4>Loot System</h4>
            <p>The guild utilizes the <NavLink to='/epgp'>EPGP</NavLink> loot system.</p>
        </Article>
        <Article>
            <h3>Contact</h3>
            <p>Feel free to contact any of our <NavLink to='/roster/officers'>officers</NavLink> in-game or through Discord.</p>
        </Article>
    </section>
)

export default Home
