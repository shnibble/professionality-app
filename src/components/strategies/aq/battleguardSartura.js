import React from 'react'
import Article from '../../article'
import Boss from '../boss'
import SarturaImg from '../../../images/battleguard_sartura.png'
import WhirlwindImg from '../../../images/ability_whirlwind.jpg'
import SunderImg from '../../../images/ability_warrior_sunder.jpg'
import RoyalGuardImg from '../../../images/50853-sarturas-royal-guard.jpg'
import KnockAwayImg from '../../../images/inv_gauntlets_05.jpg'
import EnrageImg from '../../../images/spell_shadow_unholyfrenzy.jpg'
import AbilityContainer from '../abilityContainer'
import Ability from '../ability'
import MechanicsContainer from '../mechanicsContainer'
import Mechanic from '../mechanic'
import TacticsContainer from '../tacticsContainer'
import Tactic from '../tactic'
import NotesContainer from '../notesContainer'
import Note from '../note'

const BattleguardSartura = () => (
    <>
        <Article>
            <Boss img={SarturaImg} title='Battleguard Sartura' description="Battleguard Sartura is the apparent leader of the Qiraji battleguards, and the second boss in the Temple of Ahn'Qiraj. She comes with 3 adds." />

            <AbilityContainer>
                <Ability img={SunderImg} title='Sundering Cleave' description='Inflicts about 2,500 damage to nearby enemies and reduces their armor by 1,512. Does not stack.' />
                <Ability img={WhirlwindImg} title='Whirlwind' description='Battleguard Sartura ignores threat and targets random players while spinning around in a vicious whirlwind. Players caught in the attack take roughly 3,500 damage per second un-mitigated.' />
                <Ability img={EnrageImg} title='Enrage' description='Sartura enrages at 20% health, increasing attack speed and damage.' />
                <Ability img={EnrageImg} title='Berserk' description='After ten minutes of combat Sartura enters activates Berserk, dealing massive damage and wiping the raid.' />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description='During whirlwind, Sartura will move quickly and target random players in the raid, changing targets frequently and ignoring threat.' />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Detect Magic' description='Mages should cast Detect Magic on both Sartura and her guards so the raid can see when whirlwind is used.' />
                <Tactic title='Amplify Magic' description='Mages should put Amplify Magic on the entire raid to assist with healing as only physical damage is dealt.' />
                <Tactic title='Tanking' description='Sartura does not hit too hard during her regular phase and can be taunted and tanked like normal. All tanks in the area should rotate taunts to keep her stationary between whirlwinds.' />
                <Tactic title='Stunlock' description='All stun abilities work on Sartura and should be staggered to keep her stunlocked as long as possible. This allows for more dps and mitigates her whirlwind attack.' />
                <Tactic title='Spread Out' description='The raid should be spread out around the room so they are less likely to be hit by whirlwind in a clump.' />
                <Tactic title='Run!' description='Pay attention to who Sartura is targetting during whirlwind and if it is you (or you are in her path), run away!' />
            </TacticsContainer>

            <NotesContainer>
                <Note title='Do Not Stun or Taunt During Whirlwind' description='Sartura is immune to stuns and taunts while whirlwinding.' />
                <Note title='Limited Invulnerability Potions' description='This potion can save your life if you get caught in a whirlwind.' />
                <Note title='Swiftness Potions' description='Alternatively, use a swiftness potion to outrun Sartura!' />
            </NotesContainer>
        </Article>
        <Article>
            <Boss img={RoyalGuardImg} title="Sartura's Royal Guard (x3)" />

            <AbilityContainer>
                <Ability img={KnockAwayImg} title='Knock Back' description='Sends the target flying backwards.' />
                <Ability img={WhirlwindImg} title='Whirlwind' description="Sartura's Royal Guard ignores threat and targets random players while spinning around in a vicious whirlwind. Players caught in the attack take roughly 1,200 damage per second un-mitigated." />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description='The Royal Guards function the same way as Sartura herself but they do not hit as hard and have less health.' />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Kill The Guards First' description='Typically the guards are tanked and killed first before Sartura.' />
            </TacticsContainer>
        </Article>
    </>
)

export default BattleguardSartura
