import React from 'react'
import Article from '../../article'
import Boss from '../boss'
import skeramImg from '../../../images/the_prophet_skeram.png'
import SpellShadowCharmImg from '../../../images/spell_shadow_charm.jpg'
import ClassicTempImg from '../../../images/classic_temp.jpg'
import SpellNatureWhispsplodeImg from '../../../images/spell_nature_wispsplode.jpg'
import SpellNatureEarthshockImg from '../../../images/spell_nature_earthshock.jpg'
import SpellArcaneBlinkImg from '../../../images/spell_arcane_blink.jpg'
import AbilityContainer from '../abilityContainer'
import Ability from '../ability'
import MechanicsContainer from '../mechanicsContainer'
import Mechanic from '../mechanic'
import TacticsContainer from '../tacticsContainer'
import Tactic from '../tactic'
import NotesContainer from '../notesContainer'
import Note from '../note'

const TheProphetSkeram = () => (
        <Article>
            <Boss img={skeramImg} title='The Prophet Skeram' description="The Prophet Skeram is an important religious leader in Ahn'Qiraj, being the author of the Prophecy of C'Thun. The Prophet Skeram is the first boss you'll encounter inside AQ40, and he's only a few trash pulls away from the start." />

            <AbilityContainer>
                <Ability img={SpellShadowCharmImg} title='True Fulfillment' description='Charmed. Damage increased by 300%, all spells cast instantly, all resistances increased by 50, movement speed increased by 40%.'/>
                <Ability img={ClassicTempImg} title='Summon Images' description='Summons two imaged copies of Skeram. The images have reduced health but can cast the same spells as Skeram.'/>
                <Ability img={SpellNatureWhispsplodeImg} title='Arcane Explosion' description='Deals 1500 nature damage to nearby enemies. Can be kicked.'/>
                <Ability img={SpellNatureEarthshockImg} title='Earth Shock' description='Deals 2500 nature damage to highest threat target not in melee range. Only cast if not being tanked.'/>
                <Ability img={SpellArcaneBlinkImg} title='Blink' description='Skeram blinks to a nearby platform and resets threat.'/>
            </AbilityContainer>
            
            <MechanicsContainer>
                <Mechanic description='Skeram and his images will cast True Fulfillment on random players throughout the fight.'/>
                <Mechanic description='Skeram and his images will occasionally cast Blink.'/>
                <Mechanic description='At 75%, 50% and 25% health Skeram will cast Summon Images.'/>
                <Mechanic description='If Skeram or one of his images is not tanked by a melee-ranged player they will cast Earth Shock on their highest threat target.'/>
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Three Tank Groups' description='Three tanks with two designated melee DPS players will each take a platform and tank Skeram or one of his images if they appear or blink to that location.' />
                <Tactic title='Slow Casting' description='Arcane Explosion is affected by mind numbing poison and curse of tongues. Be sure to have these methods in play to make the spell easier to kick.' />
                <Tactic title='Kick Arcane Explosion' description='Arcane Explosion has a short cast time but can be kicked by the tank and the two designated melee DPS in each position.' />
                <Tactic title='Tank Re-Positioning' description='Tanks may need to run across the platform on occasion that there are multiple Skeram/copies on one platform and drag one back to their original tanking location.' />
                <Tactic title='Caster Damage Danger' description='Casters should be wary of when Skeram or his copies cast Blink due to the aggro wipe. If they are casting a spell/shot and it lands just after the Blink they will get aggro before the tank has time to taunt, triggering Earth Shock.' />
                <Tactic title='Sheep Mind Controlled Players' description='Mages will split so equal numbers are on either side of the upper platform to sheep mind controlled players. In a bind, any other CC is acceptable to delay/stop mind controlled players but be careful of any damage dealt as it may break sheeps.' />
                <Tactic title='75% and 50% Split' description='During the first two Summon Images phases, the imaged copies should be identified ASAP by the tanks and killed first. Images can be identified by having substantially lower health than Skeram.' />
                <Tactic title='25% Split' description='On the last Summon Images phase when Skeram is at 25% the raid should instead focus on the actual Skeram and finish him off as the two copies will disappear when he is defeated.' />
            </TacticsContainer>

            <NotesContainer>
                <Note title='Nature Resistance Potions' description='All ranged and healers may want to consume nature potions to absorb the damage from Earth Shock.' />
                <Note title='Arcane Resistance Potions' description='All melee and tanks may want to consume arcane potions to absorb the damage from Arcane Explosions that are not kicked in time.' />
            </NotesContainer>
        </Article>
)

export default TheProphetSkeram
