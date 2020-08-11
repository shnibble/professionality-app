import React from 'react'
import Article from '../../article'
import Boss from '../boss'
import AbilityContainer from '../abilityContainer'
import Ability from '../ability'
import MechanicsContainer from '../mechanicsContainer'
import Mechanic from '../mechanic'
import TacticsContainer from '../tacticsContainer'
import Tactic from '../tactic'
import NotesContainer from '../notesContainer'
import Note from '../note'
import TwinEmpsImg from '../../../images/twinemps.png'
import VekLorImg from "../../../images/vek'lor.png"
import VekNilashImg from "../../../images/vek'nilash.png"
import HealBrotherImg from '../../../images/spell_nature_healingwavegreater.jpg'
import TwinTeleportImg from '../../../images/spell_arcane_blink.jpg'
import BerserkImg from '../../../images/spell_shadow_unholyfrenzy.jpg'
import ShadowBoltImg from '../../../images/spell_shadow_shadowbolt.jpg'
import ArcaneBurstImg from '../../../images/spell_nature_wispsplode.jpg'
import BlizzardImg from '../../../images/spell_frost_icestorm.jpg'
import ExplodeBugImg from '../../../images/spell_fire_fire.jpg'
import UnbalancingStrikeImg from '../../../images/ability_warrior_decisivestrike.jpg'
import UppercutImg from '../../../images/inv_gauntlets_05.jpg'
import MutateBugImg from '../../../images/ability_hunter_pet_scorpid.jpg'


const TwinEmperors = () => (
    <>
        <Article>
            <Boss img={TwinEmpsImg} title="Twin Emperors" description="Emperor Vek'lor and Emperor Vek'nilash, also known as the Twin Emperors, are the fifth boss encounter in Temple of Ahn'Qiraj. One of the most unique boss encounters in World of Warcraft: Classic, these two bosses share a health pool and swap places throughout the encounter." />

            <AbilityContainer>
                <Ability img={HealBrotherImg} title='Heal Brother' description='Instantly heals the other twin for 30000 health.' />
                <Ability img={TwinTeleportImg} title='Twin Teleport' description="Both twins switch places, teleporting to each other's position instantly." />
                <Ability img={BerserkImg} title='Berserk' description='Both twins increase in size, damage and attack speed.' />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description='The twins share a health pool so any damage done to either twin will be split equally between the two of them.' />
                <Mechanic description='If the twins are within 60 yards they will spam Heal Brother on each other.' />
                <Mechanic description='About every 35 seconds the twins will cast Twin Teleport, switching places and dropping aggro completely.' />
                <Mechanic description='When the twins teleport, they apply a bonus "proximity" threat to their nearest enemy in range.' />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Casters and Melee Rotate' description='Due to the different resists and the twins teleporting back and forth, both melee and casters will need to rotate to different sides of the room after each teleport.' />
                <Tactic title="Vek'lor Proximity Threat" description="When Vek'lor is teleporting to a position the melee tank should run out of range as quickly as possible thereby allowing the Warlock tank to move closer and receive the proximity threat." />
                <Tactic title="Vek'nilash Proximity Threat" description="When Vek'nilash is teleporting to a position the melee tank should run into melee range in front of the current Warlock tank in order to get the proximity threat." />
            </TacticsContainer>
        </Article>

        <Article>
            <Boss img={VekLorImg} title="Emperor Vek'lor" description="Emperor Vek'lor is the magic brother, has a mana bar, and is immune to all physical damage." />

            <AbilityContainer>
                <Ability img={ShadowBoltImg} title='Shadow Bolt' description='Hurls a bolt of dark magic at an enemy, inflicting Shadow damage.' />
                <Ability img={ArcaneBurstImg} title='Arcane Burst' description='An AoE knockback effect which does damage and applies a slow debuff.' />
                <Ability img={BlizzardImg} title='Blizzard' description='Ice shards pelt the target area doing Frost damage over time.' />
                <Ability img={ExplodeBugImg} title='Explode Bug' description='Targets a random Scarab or Scorpion in the room causing it to grow in size until it explodes dealing massive AoE Fire damage.' />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description="Emperor Vek'lor is completely immune to physical damage" />
                <Mechanic description='The twin will cast Shadow Bolt frequently at his primary threat target.' />
                <Mechanic description='The twin will cast Arcane Burst if any player enters his melee range, knocking them back and doing burst Arcane damage.' />
                <Mechanic description='The twin will drop Blizzards randomly around the room within his range.' />
                <Mechanic description='The twin will ocassionally cast Explode Bug.' />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Warlock Tanks' description="Two Warlocks buffed with Shadow Resistance should be stationed at either side of the room where the twins will be tanked and be ready to pickup Vek'lor as soon as he teleports. The Warlocks tanking Vek'lor should stand at maximum range to avoid getting hit with Arcane Burst." />
                <Tactic title='Tank Switching' description="When Vek'lor teleports into Vek'nilash's position he will immediately start casting Arcane Burst due to the tank being in melee range. Subsequently, the tank should start running as soon as the teleport begins to cast and be careful not to get knocked back into a wall, pinning them there." />
                <Tactic title='Avoid Blizzard' description='The Blizzard spell does massive AoE damage and must be avoided by both the Warlock tanks and the rest of the raid on that side of the room.' />
                <Tactic title='Avoid Exploding Bugs' description='The raid should be wary of bugs that are about to explode and move out of range quickly to avoid the AoE damage.' />
            </TacticsContainer>

            <NotesContainer>
                <Note title='Frost Protection Potions' description='If possible the raid should consume Frost Protection Potions before the encounter in order to mitigate damage from Blizzard, giving them more time to escape.' />
            </NotesContainer>
        </Article>

        <Article>
            <Boss img={VekNilashImg} title="Emperor Vek'Nilash" description="Emperor Vek'nilash is the melee brother and is immune to all magic damage." />

            <AbilityContainer>
                <Ability img={UnbalancingStrikeImg} title='Unbalancing Strike' description='Inflicts 350% weapon damage and leaves the target unbalanced, reducing their defense skill by 100 for 6 seconds.' />
                <Ability img={UppercutImg} title='Uppercut' description='Inflicts normal damage plus 950 to 1050 to an enemy, knocking it back.' />
                <Ability img={MutateBugImg} title='Mutate Bug' description='Mutates a nearby bug, increasing its size, health by 300% and damage dealt by 1800%.' />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description="Emperor Vek'nilash is completely immune to magical damage." />
                <Mechanic description="The twin will cast Unbalancing Strike on his primary threat target." />
                <Mechanic description="The twin will ocassionaly cast Uppercut on a random melee target." />
                <Mechanic description="The twin will ocassionally cast Mutate Bug." />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Melee Tanks' description="Two tanks with decent mitigation gear should be stationed at either side of the room where the twins will be tanked and be ready to pick up Vek'nilash as soon as he teleports. The tank should position Vek'nilash facing the wall." />
                <Tactic title='Healing Through Unbalancing Strike' description="Tanks should utilize some mitigation gear to help mitigate the Unbalancing Strike debuff. Healers should be aware of the debuff and overheal through these 6 seconds as the tank is more likely to receive crushing blows." />
                <Tactic title='Casters Kill Mutated Bugs' description='Casters must turn their attention to burn down mutated bugs before returning to DPS their twin as melee will take substantial damage from them.' />
            </TacticsContainer>
        </Article>
    </>
)

export default TwinEmperors
