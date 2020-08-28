import React from 'react'
import styled from 'styled-components'
import Article from './article'

const Code = styled.span`
    background: ${props => props.theme.colors.codeBackground};
    font-family: Courier;
    padding: 2px;
    border-radius: 4px;
`
const Li = styled.li`
    margin-left: 50px;
`
const Anchor = styled.a`
    color: ${props => props.theme.colors.anchor};
`

const EPGP = () => (
    <section>
        <h2>EPGP</h2>
        <Article>
            <h3>The Basics</h3>
            <p>EPGP stands for Effort Points Gear Points. Effort Points (EP) are accumulated mostly through attendance at raids but sometimes for other activities that benefit the guild. Gear Points (GP) are accumulated when receiving loot from raids. The quotient of these two numbers is called your Priority (PR) and helps determine when you receive loot.</p>
            <br />
            <h4>Accumulating EP</h4>
            <p>EP is awarded automatically when raid bosses are downed or manually by a guild officer. Typically higher ranking bosses are worth more EP and more advanced raids are overall worth more than the beginning raid instances.</p>
            <br />
            <p>The guild bank may sometimes offer EP incentives for certain donations or activities and sometimes guild events outside of raids may reward some amount of EP.</p>
            <br />
            <h4>Accumulating GP</h4>
            <p>A formula is used to determine an item's GP value, based on its item level and equipment slot. When you receive the item you accumulate its GP value.</p>
            <br />
            <h4>Priority</h4>
            <p>The formula <Code>EP / GP = PR</Code> determines your PR. When an item drops that is to be distributed through EPGP, all players interested in the item are added to a list and the player with the highest PR wins the item.</p>
            <br />
            <h4>Decay</h4>
            <p>Seeing as both EP and GP scores can only increase, a weekly decay is applied to both EP and GP to keep the numbers under control. The decay percentage varies and should be adjusted based on how frequently a guild raids and how expensive their GP scores are.</p>
            <br />
            <p>When decay is applied it takes away from both EP and GP equally so everyone's PR remains the same after the decay.</p>
        </Article>
        <Article>
            <h3>Guild Specifics</h3>
            <p>The following are this guild's specific configurations and custom options for the EPGP loot system.</p>
            <br />
            <h4>Loot Options</h4>
            <p>When an item is being distributed all players are asked to pick one of these four categories or pass:</p>
            <br />
            <h5>MS (High Prio)</h5>
            <p><i>Costs 100% of GP value</i></p>
            <p>The highest priority which indicates that the item will be used for the player's main spec in raids and is a substantial upgrade over their current item in the same slot.</p>
            <br />
            <h5>MS (Low Prio)</h5>
            <p><i>Costs 90% of GP Value</i></p>
            <p>Second highest priority which still indicates that the item will be used for the player's main spec in raids but can be used as a courtesy to "pass for now" so others who need it more (High Prio) can get the item first. Offers a minor discount in return.</p>
            <br />
            <h5>Off Spec + PvP</h5>
            <p><i>Costs 50% of GP Value</i></p>
            <p>Third in line of priority which indicates that the item will be used for the player's off spec or for PvP. An example would be DPS Warriors obtaining tank gear.</p>
            <br />
            <h5>Meme + RP</h5>
            <p><i>Costs 25% of GP Value</i></p>
            <p>The last in line of priority which indicates that the player would like to have the item for the memes rather than have it go to disenchant. This option should only be used for odd items and trinkets that typically have no value in raids or PvP but might be used for fun, RP, farming, collections, etc.</p>
            <br />
            <h4>Decay Rate</h4>
            <p>The guild currently decays both EP and GP by 20% every week.</p>
            <br />
            <h4>Onyxia</h4>
            <p>Attending an Onyxia raid in which the majority of attendees are from the guild awards a flat 20 EP, however, loot is rolled out the traditional way rather than by PR and no GP is accumulated from items obtained.</p>
            <br />
            <h4>Zul'Gurub and Ruins of Ahn'Qiraj</h4>
            <p>Attending either a ZG or AQ20 raid in which the majority of attendees are from the guild awards a flat 10 EP, however, loot is rolled out the traditional way rather than by PR and no GP is accumulated from items obtained.</p>
            <br />
            <h4>Standby List</h4>
            <p>If there is no room in the raid a player may be added to the Standby List and receive the same amount of EP as the raid group as they progress through the instance.</p>
            <ul>
                <Li><p>The Standby List is only applicable to 40 person weekly lockout raids.</p></Li>
                <Li><p>The player must travel with the raid group and log out their character at the instance entrance to be ready should a spot open up.</p></Li>
                <Li><p>The player must remain available in-game or in Discord to fill a spot when asked.</p></Li>
                <Li><p>If a player is contacted to fill a spot in the raid and they do not respond timely, they will be taken off the Standby List and receive zero EP for the raid event.</p></Li>
            </ul>
            <br />
            <h4>Raid Leader Benching</h4>
            <p>If a player is benched by the raid leader for any reason while the player was otherwise ready, they may choose to take 50% of the EP earned during the raid instead of going on the Standby List.</p>
            <br />
            <h4>Add-On</h4>
            <p>There is an add-on which everyone, including PUGs, should download and use for Professionality raids which helps facilitate the EPGP system. It is called CEPGP and can be downloaded from Curse Forge here: <Anchor href='https://www.curseforge.com/wow/addons/cepgp' target='_BLANK' rel='noopener noreferrer'>https://www.curseforge.com/wow/addons/cepgp</Anchor>.</p>
        </Article>
    </section>
)

export default EPGP
