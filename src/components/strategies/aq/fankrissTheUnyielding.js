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
import MortalWoundImg from '../../../images/ability_criticalstrike.jpg'
import EntangleImg from '../../../images/spell_nature_web.jpg'
import FankrissImg from '../../../images/fankriss.png'
import SummonWormImg from '../../../images/classic_temp.jpg'

const FankrissTheUnyielding = () => (
    <Article>
        <Boss img={FankrissImg} title='Fankriss The Unyielding' description="Fankriss the Unyielding, a sand reaver, is the big brother of Kurinnaxx, and the third boss of the Temple of Ahn'Qiraj." />

        <AbilityContainer>
            <Ability img={MortalWoundImg} title='Mortal Wound' description='A cleave attack which applies a stacking debuff that reduces healing by 10% per stack.' />
            <Ability img={EntangleImg} title='Entangle' description='Teleports a random player and entangles them in web for a short period of time.' />
            <Ability img={SummonWormImg} title='Summon Worm' description='Summons a Spawn of Fankriss somewhere near the outer edge of the room.' />
        </AbilityContainer>

        <MechanicsContainer>
            <Mechanic description="Fankriss will use his main ability, Mortal Wound, frequently, applying it to the main tank and anyone else in front of him." />
            <Mechanic description='Dozens of Vekniss Hatchlings will be spawning throughout the encounter and will likely aggro onto healers unless they are tanked or killed.' />
            <Mechanic description='Spawns of Fankriss appear intermittently throughout the encounter and do very high melee damage. They also enrage a short while after spawning, drastically increasing their damage.' />
            <Mechanic description='Fankriss will cast Entangle on random players who are not the main tank throughout the encounter.' />
        </MechanicsContainer>

        <TacticsContainer>
            <Tactic title='Positioning' description='Fankriss must be tanked facing 180 degrees from the raid in order to avoid Mortal Wound being cleaved into the melee. Melee should stack directly opposite of the tank. The rest of the raid should be behind the melee.' />
            <Tactic title='Mortal Wound' description="When the current tank’s stacks of Mortal Wound get too high to heal through a new tank will move in front of Fankriss and taunt to take over, allowing the previous tank to retreat into the melee position and let their stacks fall off." />
            <Tactic title='Vekniss Hatchlings' description="Vekniss Hatchlings need to be AoE tanked to keep them off of healers. A Paladin tank is ideal for this as they can BoK spam to grab all the stray mobs, but they must be careful not to accidentally pull Fankriss as well. The tank will need to call for AoE to kill the bugs whenever their numbers are too high." />
            <Tactic title='Spawns of Fankriss' description="At least one tank with high mitigation gear should be assigned to the Spawns of Fankriss when they pop up as they can very easily one-shot healers if they are not controlled. DPS must prioritize the Spawns of Fankriss to kill them before they enrage. The spawns should also be stunned as often as possible to mitigate their high damage output." />
            <Tactic title='Heal Entangled Players' description="In addition to the tanks and raid healing, some healers should be assigned to heal Entangled players. These healers may need to move outside of the raid group to be close enough to heal Entangled targets." />
        </TacticsContainer>

        <NotesContainer>
            <Note title='Enraged Spawns of Fankriss' description='Enraged Spawns of Fankriss can easily one-shot players and if left uncontrolled can easily wipe the raid.' />
            <Note title='Hunter Pulling & Kiting' description='A Hunter can assist with Spawns of Fankriss to help guide them to the tank and if necessary kite them around the raid should they enrage.' />
        </NotesContainer>
    </Article>
)

export default FankrissTheUnyielding
