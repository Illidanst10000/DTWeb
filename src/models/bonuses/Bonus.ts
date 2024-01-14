import {Character, CharPower, CharType} from "../characters/Character";
import {calcPerc} from "../../utils";
import {ArtilleryEffect, EffectKind, MoreMoves, Poison, ToEndEffect} from "../effects/Effect";
import {Modify, ModifyCharStats} from "../characters/CharactersStats";

export enum Bonuses {
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
    SpearDefence, // Start bonus: on the first turn in a battle, the character gets tripled protection
    FlankStrike,
    Basic,
}
export class Bonus {
    static onAttacked(bonus: Bonuses, damage: CharPower, receiver: Character, sender: Character): CharPower {
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
                sender.attack(receiver)
                return damage
            default: return CharPower.empty()
        }
    }

    static onAttacking(bonus: Bonuses, damage: CharPower, receiver: Character, sender: Character): CharPower {
        switch (bonus) {
            case Bonuses.DefencePiercing | Bonuses.VampiresGist | Bonuses.AncientVampiresGist | Bonuses.Dodging:
               return this.pierce(sender)
            case Bonuses.PoisonAttack:
                if (!receiver.hasEffectKind(EffectKind.Poison) && receiver.info.charType !== CharType.Undead) {
                    if (damage.range > 1 || damage.melee > 1) {
                        receiver.addEffect(new Poison());
                    }
                }
                return damage;
            case Bonuses.GodAnger:
                damage.melee += 10;
                return damage;
            case Bonuses.GodStrike:
                damage.melee += 20;
                return damage;
            case Bonuses.FlankStrike:
                if (damage.melee > 0 && Math.abs(receiver.charPos.x - sender.charPos.x) > 1) {
                    damage.melee += Math.max(0, sender.modified.damage.melee - receiver.modified.defence.meleeUnits / 2)
                }
                return damage;
            default: return CharPower.empty();
        }
    }

    static onKill(bonus: Bonuses, damage: CharPower, receiver: Character, sender: Character): boolean {
        if (bonus === Bonuses.Berserk) {
            const percentRate = 10;
            const charStats: ModifyCharStats = new ModifyCharStats();

            charStats.damage.melee.updateValues(new Modify().add(percentRate));
            charStats.damage.magic.updateValues(new Modify().add(percentRate));
            charStats.damage.range.updateValues(new Modify().add(percentRate));

            sender.addEffect(new ToEndEffect(charStats))
            return true
        }
        return false
    }

    static onBattleStart(bonus: Bonuses, char: Character): boolean {
        if (bonus === Bonuses.Fast || bonus === Bonuses.AncientVampiresGist || bonus === Bonuses.FastDead) {
            char.addEffect(new MoreMoves())
            return true
        }
        if (bonus === Bonuses.Artillery) {
            char.addEffect(new ArtilleryEffect().setLifetime(1))
            return true
        }
        return false
    }

    static pierce(sender: Character): CharPower {
        const { magic, range, melee } = sender.modified.damage;
        if (magic > range && magic > melee) {
            return { magic: magic, range: 0, melee: 0 };
        } else if (melee > range && melee > magic) {
            return { magic: 0, range: 0, melee: melee };
        } else {
            return { magic: 0, range: range, melee: 0 };
        }
    }
}