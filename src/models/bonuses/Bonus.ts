import {Character, CharPower} from "../characters/Character";
import {calcPerc} from "../../utils";

enum Bonuses {
    DefencePiercing,
    Dodging, // Defence bonus: only 70% of the enemy's blows pass through the character's defence
    Fast, // Start bonus: on the first turn in a battle the character receives +1 manoeuvre ????????? maybe
    DeadDodging, // Defence bonus: the character is dead and therefore the arrows cause 70% less damage
    FastDead,
    VampiresGist, // Attack and defence bonus: the Evil force allows the character to ignore enemy armour, and absorbs 30% of the enemy's impact
    AncientVampiresGist, // Attack, defence and start bonus: the Evil force allows the character to
// ignore enemy armour, and absorbs 30% of the enemy's impact, while on the first
// turn of battle the character gains +1 manoeuvre
    Berserk,
    Block,
    PoisonAttack,
    Invulrenable, // Defence bonus: the character loses only 1 life hit from any hit
    GodAnger, // Attack bonus: the character inflicts 10 damage on top of his attack anyway, ignoring any enemy defences
    GodStrike, // Attack bonus: the character inflicts 20 damage on top of his attack anyway, ignoring any enemy defences
    Ghost, // Defence bonus: the character is invulnerable to physical weapons, and if killed, his rage takes the life of his killer
    DeathCurse,
    Artillery, // Start and attack bonus: the character always gets the very first move in a battle,
    Counterblow,
    Stealth,
    SpearDefence, // Start bonus: on the first turn in a battle, the character gets tripled protection
    FlankStrike,
}
export class Bonus {
    onAttack(bonus: Bonuses, damage: CharPower, receiver: Character, sender: Character): CharPower {
        switch (bonus) {
            case (Bonuses.AncientVampiresGist | Bonuses.VampiresGist | Bonuses.DeadDodging | Bonuses.Dodging):
                const dodgeRate = 70;
                return {
                    magic: calcPerc(damage.magic, dodgeRate),
                    range: calcPerc(damage.range, dodgeRate),
                    melee: calcPerc(damage.melee, dodgeRate),
                }
            case (Bonuses.Invulrenable):
                return {
                    magic: Math.min(damage.magic, 1),
                    range: Math.min(damage.range, 1),
                    melee: Math.min(damage.melee, 1),
                }
            case (Bonuses.Ghost):
                let correctedGhostDamage = damage.magic

                if (correctedGhostDamage === 0) {
                    correctedGhostDamage = 1;
                }
                if (receiver.modified.hp - correctedGhostDamage < 1) {
                    if ( sender.modified.defence.deathMagic <= 30 * (sender.modified.maxMoves)) {
                        sender.kill();
                    }
                }

                const {range, melee} = CharPower.empty()
                return {
                    magic: damage.magic,
                    range: range,
                    melee: melee,
                }
            case (Bonuses.DeathCurse):
                let correctedCurseDamage = damage.magic + damage.range + damage.melee
                if (correctedCurseDamage === 0) {
                    correctedCurseDamage = 1;
                }
                if (receiver.modified.hp - correctedCurseDamage < 1) {
                        sender.kill();
                }
                return damage
            case (Bonuses.Counterblow):
                sender.attack()
                // TODO: require char.attack()
                return damage
            default: return CharPower.empty()
        }
    }


}