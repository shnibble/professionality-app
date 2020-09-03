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
        <Article>
            <h3>Zul'Gurub</h3>
            <h4>Loot</h4>
            <ul>
                <Li>Any bind-on-equip items that drop from trash such as bijous, coins, greens, patterns should be "Need" rolled by the entire raid so they are evenly distributed.</Li>
                <Li>Any bind-on-pickup items that drop from trash should only be "Need" rolled by those who can and will use them.</Li>
                <Li>Bosses will be master looted and distributed to the applicable classes based on MS > OS.</Li>
            </ul>
            <br />
            <h4>Idols</h4>
            <ul>
                <Li>Idols will be raid rolled by the master looter. Each member of the raid may only win one idol per run.</Li>
                <Li>In keeping with the guild's policy on Alt Characters, main characters will have priority over alt characters for Idols.</Li>
            </ul>
            <br />
            <h4>Heart of Hakkar</h4>
            <ul>
                <Li>Should the group require PUGs to fill out the only item reserved for the guild is the Heart of Hakkar.</Li>
                <Li>Healers/Casters have first priority on the heart, then everyone else after.</Li>
                <Li>Exceptions can be made at the discretion of the raid leader.</Li>
            </ul>
            <br />
            <h4>Edge of Madness</h4>
            <ul>
                <Li>The raid will do the Edge of Madness if a member supplies the materials needed.</Li>
                <Li>The person who brings the materials has priority on the first trinket piece dropped.</Li>
                <Li>Additional trinket pieces can be rolled on by those also pursuing their class trinket.</Li>
            </ul>
            <br />
            <h4>Fish Boss</h4>
            <ul>
                <Li>If a fish pool is passed the raid should stop to fish it regardless.</Li>
                <Li>The raid leader will determine if the raid will complete the fish boss or not based on the number of mudskunks available and if the raid group wants to complete it.</Li>
            </ul>
            <br />
            <h4>Mounts</h4>
            <ul>
                <Li>Mounts can be rolled on by any members of the raid.</Li>
            </ul>
        </Article>
    </section>
)

export default Rules
