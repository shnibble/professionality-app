import React from 'react'
import Article from '../../article'
import Boss from '../boss'
import BugFamilyImg from '../../../images/Three_bugs.jpg'
import AbilityContainer from '../abilityContainer'
import Ability from '../ability'
import MechanicsContainer from '../mechanicsContainer'
import Mechanic from '../mechanic'
import TacticsContainer from '../tacticsContainer'
import Tactic from '../tactic'
import NotesContainer from '../notesContainer'
import Note from '../note'
import LordKriImg from '../../../images/lord_kri.png'
import ToxicVolleyImg from '../../../images/spell_nature_corrosivebreath.jpg'
import ThashImg from '../../../images/ability_ghoulfrenzy (1).jpg'
import CleaveImg from '../../../images/ability_warrior_cleave.jpg'
import ToxicVaporsImg from '../../../images/ability_creature_disease_02.jpg'
import PrincessYaujImg from '../../../images/princess_yauj.png'
import PanicImg from '../../../images/spell_shadow_deathscream.jpg'
import RavageImg from '../../../images/ability_ghoulfrenzy.jpg'
import GreatHealImg from '../../../images/spell_holy_heal.jpg'
import DispelImg from '../../../images/spell_holy_dispelmagic.jpg'
import VemImg from '../../../images/vem.png'
import KnockAwayImg from '../../../images/inv_gauntlets_05.jpg'
import KnockDownImg from '../../../images/ability_golemthunderclap.jpg'
import BerserkerChargeImg from '../../../images/ability_warrior_charge.jpg'


const BugFamily = () => (
    <>
        <Article>
            <Boss img={BugFamilyImg} title='Bug Family' description="The Three Bugs, also known as the Trinity, the Triumvirate, the Triad, the Bug Family, and the Royal Trio, are optional bosses in the Temple of Ahn'Qiraj. It is composed of Lord Kri, Princess Yauj and Vem, which must be fought all at the same time." />

            <NotesContainer>
                <Note title='Reset Fight' description='The raid is able to reset the fight if all players run out of the room the Bug Family inhabits.' />
                <Note title='Loot Table' description='The loot dropped from this encounter depends on the last one of the three killed.' />
            </NotesContainer>
        </Article>

        <Article>
            <Boss img={LordKriImg} title='Lord Kri' description="Lord Kri is one of three bosses in the Three Bugs encounter in the Temple of Ahn'Qiraj raid instance." />
            <AbilityContainer>
                <Ability img={CleaveImg} title='Cleave' description='A frontal cleave attack which hits tanks for around 1,000 damage.' />
                <Ability img={ThashImg} title='Thrash' description='Adds two additional attacks.' />
                <Ability img={ToxicVolleyImg} title='Toxic Volley (AoE)' description='A massive ranged AoE attack which does around 500 nature damage and adds a stacking debuff called Toxic Volley.' />
                <Ability img={ToxicVolleyImg} title='Toxic Volley (Debuff)' description='A stacking debuff which does 150 nature damage every 2 seconds per stack.' />
                <Ability img={ToxicVaporsImg} title='Toxic Vapors' description='A toxic cloud that inflicts 1,800 nature damage per second.' />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description='Drops a green cloud of Toxic Vapors on his corpse upon death which lasts for 2 minutes.' />
                <Mechanic description='Becomes enraged if Vem is killed, increasing in size and damage.' />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Nature Resistance' description='If possible, the tank assigned to Lord Kri should have a substantial amount of Nature Resistance gear to mitigate Toxic Volley stacks.' />
                <Tactic title='Tank Out of Line-of-site' description='Lord Kri should be positioned somewhere out of line-of-site from the raid to minimize the effects of Toxic Volley.' />
                <Tactic title='Stay Away from Corpse!' description='Stay away from his corpse as the Toxic Vapors will kill anyone standing in it within a few seconds.' />
            </TacticsContainer>
        </Article>

        <Article>
            <Boss img={PrincessYaujImg} title='Princess Yauj' description="Princess Yauj is one of three bosses in the Three Bugs encounter in the Temple of Ahn'Qiraj raid instance." />
            <AbilityContainer>
                <Ability img={PanicImg} title='Panic' description='AoE fear which wipes threat and causes nearby targets to flee for 8 seconds.' />
                <Ability img={RavageImg} title='Ravage' description='Single target attack which hits tanks for around 1,000 damage and knocks them down for 2 seconds.' />
                <Ability img={GreatHealImg} title='Great Heal' description='Calls upon Holy magic to heal an ally for 69,375 health.' />
                <Ability img={DispelImg} title='Dispel' description='Dispels magic on an ally, removing 5 harmful spells.' />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description='Spawns several small bugs upon death. They can be managed with CC and AoE.' />
                <Mechanic description='Becomes enraged if Vem is killed, increasing in size and damage.' />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Double Tank' description='Two players should tank her, rotating fear mitigation abilities and positioning themselves in such a way that they can taunt Princess Yauj as she runs towards the raid after casting Panic.' />
                <Tactic title='Fear Warders and Healers' description='Fear Warders and healers assigned to her tanks need to be at max range from Princess Yauj so they are not hit by Panic as well.' />
                <Tactic title='Backup Tank' description='Keeping an extra tank near the raid group to pick her up in case something goes wrong with her two tanks is a solid backup plan.' />
                <Tactic title='Kick Heals' description='Great Heal should be kicked if she begins to cast it on herself or the other two bugs.' />
            </TacticsContainer>

            <NotesContainer>
                <Note title='Panic Wipes Threat' description='Even if the target is immune to fear, threat is still wiped whenever Princess Yauj casts Panic.' />
            </NotesContainer>
        </Article>

        <Article>
            <Boss img={VemImg} title='Vem' description="Vem is one of three bosses in the Three Bugs encounter in the Temple of Ahn'Qiraj raid instance." />
            <AbilityContainer>
                <Ability img={KnockAwayImg} title='Knock Away' description='A knock away attack which deals damage and sends the target flying backwards.' />
                <Ability img={KnockDownImg} title='Knock Down' description='Stuns the target for 1 second.' />
                <Ability img={BerserkerChargeImg} title='Berserker Charge' description='A charge which does damage and sends the target flying high into the air.' />
            </AbilityContainer>

            <MechanicsContainer>
                <Mechanic description='When Vem is killed both Lord Kri and Princess Yauj will enrage if they are alive.' />
            </MechanicsContainer>

            <TacticsContainer>
                <Tactic title='Tank Out of Line-of-site' description='A tank and small healing team will pull Vem out of line-of-site from the rest of the raid so that her charge is mitigated.' />
            </TacticsContainer>
        </Article>
    </>
)

export default BugFamily
