import React from 'react'
import styled from 'styled-components'
import Article from './article'

const Li = styled.li`
    margin-left: 50px;
`

const Rules = () => (
    <section>
        <h2>Rules</h2>
        <Article>
            <h3>Onyxia's Lair</h3>
            <p>Loot will be distributed by MS > OS rolls for Onyxia with a +1 rule.</p>
            <p>+1 means obtaining an item gives you a lower priority on other items from the same raid.</p>
        </Article>
        <Article>
            <h3>Alt Characters</h3>
            <p>In order to better gear characters that are primarily designated for raiding, the following rules will apply to "alt" characters in the guild.</p>
            <ul>
                <Li>All guild members with raid-eligible alts must designate which character they intend to make their "main." This character will be treated as normal in the raid environment as we have it today. Any other characters will be considered "alts".</Li>
                <Li>Alt characters will not be permitted to attend progression raids unless specifically requested by a raid leader for the purpose of balancing raid composition -- if an alt is brought to a progression raid for this reason they will be treated like a main character.</Li>
                <Li>Alt characters are welcome to attend farm raids if the raid composition allows for it and at the discretion of the raid leader.</Li>
                <Li>Alt characters loot priority is just below "MS (Low Prio)" so they may only win loot if no main characters pick either MS options for a particular item.</Li>
                <Li>Alt characters attending Onyxia's Lair may only win loot if all main characters pass on a particular item.</Li>
            </ul>
        </Article>
    </section>
)

export default Rules
