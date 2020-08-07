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
import ViscidusImg from '../../../images/viscidus.png'
import PoisonBoltVolleyImg from '../../../images/spell_nature_corrosivebreath.jpg'
import PoisonShockImg from '../../../images/spell_nature_acid_01.jpg'
import PoisonCloudImg from '../../../images/spell_nature_abolishmagic.jpg'

const Viscidus = () => (
    <Article>
        <Boss img={ViscidusImg} title='Viscidus' description="Viscidus is the second optional boss encounter in Temple of Ahn'Qiraj. Viscidus is unique because the fight revolves around freezing and shattering the boss multiple times, and once shattered, the raid will need to focus down blobs throughout the room, which reduces the boss's health a significant amount when killed. Viscidus serves as an optional encounter in the Ahn'Qiraj raid." />

        <AbilityContainer>
            <Ability img={PoisonBoltVolleyImg} title='Poison Bolt Volley' description='Shoots poison at an enemy, inflicting Nature damage, then additional damage every 2 sec. for 10 sec.' />
            <Ability img={PoisonShockImg} title='Poison Shock' description='Inflicts around 1,500 Nature damage to enemies within 15 yards.' />
            <Ability img={PoisonCloudImg} title='Poison Cloud' description='Inflicts Nature damage to nearby enemies every 5 sec.' />
        </AbilityContainer>

        <MechanicsContainer>
            <Mechanic description='Viscidus will launch Poison Bolt Volleys constantly throughout the fight, inflicting Nature damage and adding debuffs to the entire raid.' />
            <Mechanic description='Viscidus casts Poison shock around every 10 seconds.' />
            <Mechanic description='Poison clouds will appear on random players throughout the fight.' />
            <Mechanic description='Frost attacks and spells will cause Viscidus to freeze. The amount of damage does not matter, rather the number of hits. Once frozen completely, a certain number of melee hits will cause him to shatter into 1-20 small globes that spawn on the outside edges of the room; each one representing 5% of his health.' />
        </MechanicsContainer>

        <TacticsContainer>
            <Tactic title='Freezing' description='The entire raid should focus on using the fastest possible frost attacks they have in their arsenal. This means Mages using rank 1 frost bolt, casters using frost wands and melee using frost damage weapons.' />
            <Tactic title='Shattering' description='As soon as Viscidus is frozen the raid will have 15 seconds to shatter him with melee attacks. Again the amount of damage does not matter, rather the number of attacks so faster weapons are best for this phase. Casters and healers should move into melee range at this stage and assist with the melee attacks as well.' />
            <Tactic title='AoE Globes' description='As soon as Viscidus shatters into the small globes, they will begin converging on the center of the room. The entire raid must quickly stack in the very center and cast their most powerful AoE abilities just as the globes come into range. Mages should spam Arcane Explosion, Priests can use Holy Nova, Warlocks use Hellfire, and all Engineers in the raid should trigger Goblin Sapper Charges. If all the globes are destroyed then Viscidus will die, otherwise the freezing stage needs to be repeated until they are all gone.' />
            <Tactic title='Avoid Poison Clouds' description='You can see where a Poison Cloud is going to appear based on a single target Nature bolt Viscidus shoots out. Avoid the clouds as they do massive amounts of Nature damage.' />
            <Tactic title='Nature Damage Mitigation' description='The entire raid should equip as much Nature Resistance gear as possible to help mitigate the Poison Bolt Volleys. Those who can cleanse poisons should be spamming cleanse on the entire raid.' />
        </TacticsContainer>

        <NotesContainer>
            <Note title='Consumables' description='Everyone should have a stack or two of Nature Resistance potions as well as Elixirs of Poison Resistance, using them throughout the encounter to stay alive.' />
            <Note title='Resetting' description='Viscidus can be reset by having everyone run out of the room. This is convenient for progression as the raid can move out if they do not do  well and refresh for quick attempts.' />
            <Note title='No Frost Damage? Stay Out!' description='If you are not a healer and you have no way of doing frost damage during the freezing phase, you should remain mounted and outside of the room so you do not take damage. Be sure to run in just before Viscidus freezes, however, to assist with shattering.' />
        </NotesContainer>
    </Article>
)

export default Viscidus
