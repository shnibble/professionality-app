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
import HuhuranImg from '../../../images/huhuran.png'
import AcidSpitImg from '../../../images/spell_nature_corrosivebreath.jpg'
import WyvernStingImg from '../../../images/inv_spear_02.jpg'
import BerserkImg from '../../../images/ability_druid_challangingroar.jpg'

const PrincessHuhuran = () => (
    <Article>
        <Boss img={HuhuranImg} title='Princess Huhuran' description="Princess Huhuran is a large silithid wasp, and the fourth boss of the Temple of Ahn'Qiraj." />

        <AbilityContainer>
            <Ability img={BerserkImg} title='Frenzy' description='Huhuran goes into a Frenzy, casting Poison Bolts at the raid.' />
            <Ability img={AcidSpitImg} title='Acid Spit' description='A stacking debuff which inflicts Nature damage to an enemy every 2 sec.' />
            <Ability img={WyvernStingImg} title='Wyvern Sting' description='A stinging shot that puts the target to sleep for 12 sec. Does massive damage if dispelled.' />
            <Ability img={AcidSpitImg} title='Noxious Poison' description='Deals Nature damage every 2 sec. and silences anyone within 15 yards.' />
            <Ability img={BerserkImg} title='Berserk' description='Princess Huhuran doubles her attack speed and begins casting Poison Bolts every 2 sec. to the closest 15 players.' />
        </AbilityContainer>

        <MechanicsContainer>
            <Mechanic description='Huhuran will go into a Frenzy throughout the fight until she reaches Berserk phase.' />
            <Mechanic description='Huhuran will apply stacks of Acid Spit on her primary target.' />
            <Mechanic description='Huhuran will cast Wyvern Sting and Noxious Poison on random players in the raid.' />
            <Mechanic description='At 30% health, Huhuran will go into Berserk phase.' />
        </MechanicsContainer>

        <TacticsContainer>
            <Tactic title='Tranquelize' description="Hunters will need to cast Tranquelizing Shot to supress Huhuran's Frenzy. Note that she does not Frenzy during Berserk phase." />
            <Tactic title='Tank Switching' description='Two tanks will need to stay on the top of her threat list and switch back and forth to allow the stacks of Acid Spit to fall off. Huhuran cannot be taunted so the tanks need to work closely together to manage their threat.' />
            <Tactic title='Spread Out' description='The entire raid should be spread out in a large semicircle behind Huhuran to mitigate the AoE effects of Noxious Poison.' />
            <Tactic title='Do Not Dispell Wyvern Sting' description='If Wyvern String is removed from a player it will do massive damage potentially killing them. Be sure not to cleanse this poison.' />
            <Tactic title='Enrage Soakers' description='15 players, ideally melee and hunters, with as much Nature Resistance as they can obtain, should stack very close to Huhuran while staying behind her. This stacking needs to occur prior to her Enrage phase to protect the rest of the raid and the tanks, who will be standing just a little bit further away than the soakers.' />
        </TacticsContainer>

        <NotesContainer>
            <Note title='Nature Resistance' description='The 15 soakers need to have around 200 Nature Resistance to properly mitigate the Enrage phase. Tanks and other members of the raid do not need to equip Nature Resistance for this encounter.' />
            <Note title='Threat Management' description='Managing threat is incredibly important as Huhuran cannot be taunted but two tanks need to bounce back and forth a few times throughout the encounter. DPS need to be very careful not to overtake either of the tanks on threat.' />
        </NotesContainer>
    </Article>
)

export default PrincessHuhuran
