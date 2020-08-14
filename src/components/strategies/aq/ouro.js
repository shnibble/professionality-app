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
import OuroImg from '../../../images/ouro.png'
import SandBlastImg from '../../../images/spell_nature_cyclone.jpg'
import SweepImg from '../../../images/spell_nature_thorns.jpg'
import BoulderImg from '../../../images/ability_throw.jpg'
import ClassicTempImg from '../../../images/classic_temp.jpg'
import DirtMoundImg from '../../../images/spell_nature_earthquake.jpg'
import EnrageImg from '../../../images/ability_druid_challangingroar.jpg'

const Ouro = () => (
    <Article>
        <Boss img={OuroImg} title='Ouro' description="The ancient Sand Worm, Ouro, is a being of legendary power. He is rumored to have been created by the Old God C'Thun himself as a mockery of life. He resides in the Temple of Ahn'Qiraj. His skin is unnaturally thick, nearly impregnable. It's flexible and allows him to move with the speed and grace of a much smaller creature." />

        <AbilityContainer>
            <Ability img={SandBlastImg} title='Sand Blast' description='Blasts sand in a 45 yard 180 degree cone infront of Ouro, dealing massive Nature damage, stunning and completely wiping threat on any targets affected.' />
            <Ability img={SweepImg} title='Sweep' description='A 360 degree cleaving attack which does physical damage and knocking targets back. 30 yard range.' />
            <Ability img={BoulderImg} title='Boulder' description='Hurls a boulder at an enemy, inflicting massive physical damage.' />
            <Ability img={ClassicTempImg} title='Submerge' description='Ouro burrows into the ground.' />
            <Ability img={ClassicTempImg} title='Ground Rupture' description='Deals 2,000 physical damage to targets directly above Ouro when he emerges from the ground.' />
            <Ability img={DirtMoundImg} title='Dirt Mound' description='Deals substantial Nature damage every second to targets within 8 yards.' />
            <Ability img={ClassicTempImg} title='Summon Scarabs' description='Summons Ouro Scarabs which will target random enemies.' />
            <Ability img={EnrageImg} title='Enrage' description='Ouro gains Enrage, increasing attack speed and damage and no longer submerging.' />
        </AbilityContainer>

        <MechanicsContainer>
            <Mechanic description='Ouro will cast Sand Blast every 20 to 25 seconds while emerged.' />
            <Mechanic description='Ouro will cast Sweep, knocking back all targets in 30 yards while emerged.' />
            <Mechanic description='Ouro will throw Boulders at ranged targets if no enemies are within melee range of him while emerged.' />
            <Mechanic description='Ouro has a chance to submerge every 1.5 minutes but it is somewhat random.' />
            <Mechanic description='While submerged Ouro will summon Dirt Mounds which travel around the room targeting random players.' />
            <Mechanic description='Ouro will Summon Scarabs when he emerges. However, the Scarabs will despawn after 45 seconds.' />
            <Mechanic description='Ouro will Enrage at 20% health. During this phase he will no longer submerge but will continue to summon Dirt Mounds and Scarabs.' />
        </MechanicsContainer>

        <TacticsContainer>
            <Tactic title='Positioning' description='Ouro must always be tanked facing away from the raid and everyone besides the current MT needs to be behind the 180 degree angle to avoid getting hit with Sand Blast. Ranged and healers should be outside of 30 yards to avoid getting hit by Sweep.' />
            <Tactic title='Tank Swapping' description='Backup tanks should be ready to intercept and taunt when the MT gets Sand Blasted.' />
            <Tactic title='AoE or CC Scarabs' description='Because the Scarabs despawn it is okay to either AoE them down or CC them until the despawn.' />
            <Tactic title='Avoid Dirt Mounds' description='Dirt Mounds do continuous damage and move rather quickly. The raid should stay somewhat spread out and run away from mounds if they are the ones being chases.' />
        </TacticsContainer>

        <NotesContainer>
            <Note title='Nature Resistance' description='Having a decent amount of Nature resistance will help to mitigate much of the damage. Equip what you can while still being effective at your role.' />
            <Note title='Swiftness Potions' description='It is good to have Swiftness Potions on-hand if you are getting hammered by Dirt Mounds and cannot seem to escape.' />
        </NotesContainer>
    </Article>
)

export default Ouro
