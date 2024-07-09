import {Character, CharPower, CharType} from "../characters/Character";
import {calcPerc} from "../../utils";
import {ArtilleryEffect, EffectKind, MoreMoves, Poison, ToEndEffect} from "../effects/Effect";
import {Modify, ModifyCharStats} from "../characters/CharactersStats";

export enum Bonuses {
    // -
    DefencePiercing,

    // Defence bonus: only 70% of the enemy's blows pass through the character's defence
    Dodging,

    // Start bonus: on the first turn in a battle the character receives an additional move
    Fast,

    // Defence bonus: the character is dead and therefore the arrows cause 70% less damage
    DeadDodging,

    // -
    FastDead,

    // Attack and defence bonus: the Evil force allows the character to ignore enemy armour, and absorbs 30% of the enemy's impact
    VampiresGist,

    // Attack, defence and start bonus: the Evil force allows the character to
    // ignore enemy armour, and absorbs 30% of the enemy's impact, while on the first
    // turn of battle the character gains +1 move
    AncientVampiresGist,

    // -
    Berserk,

    // -
    Block,

    // Apply poison effect with attack
    PoisonAttack,

    // Defence bonus: the character loses only 1 life hit from any hit
    Invulnerable,

    // Attack bonus: the character inflicts 10 damage on top of his attack anyway, ignoring any enemy defences
    GodAnger,

    // Attack bonus: the character inflicts 20 damage on top of his attack anyway, ignoring any enemy defences
    GodStrike,

    // Defence bonus: the character is invulnerable to physical weapons, and if killed, his rage takes the life of his killer
    Ghost,

    // -
    DeathCurse,

    // Start and attack bonus: the character always gets the very first move in a battle,
    Artillery,

    // Attacking back when getting attack
    Counterblow,

    // Start bonus: on the first turn in a battle, the character gets tripled protection
    SpearDefence,

    // -
    FlankStrike,

    Basic,
}

const DODGE_RATE = 70;
const DEATH_MAGIC_THRESHOLD = 30;

export class Bonus {
    static onAttacked(bonus: Bonuses, damage: CharPower, receiver: Character, sender: Character): CharPower {
        switch (bonus) {
            case Bonuses.AncientVampiresGist:
            case Bonuses.VampiresGist:
            case Bonuses.DeadDodging:
            case Bonuses.Dodging:
                return this.adjustDamage(damage, DODGE_RATE);

            case Bonuses.Invulnerable:
                return this.adjustDamage(damage, 1);

            case Bonuses.Ghost:
                return this.handleGhost(damage, receiver, sender);

            case Bonuses.DeathCurse:
                return this.handleDeathCurse(damage, receiver, sender);

            case Bonuses.Counterblow:
                sender.attack(receiver);
                return damage;

            default:
                return damage
        }
    }

    static onAttacking(bonus: Bonuses, damage: CharPower, receiver: Character, sender: Character): CharPower {
        switch (bonus) {
            case Bonuses.DefencePiercing:
            case Bonuses.VampiresGist:
            case Bonuses.AncientVampiresGist:
            case Bonuses.Dodging:
                return this.pierce(sender);

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
                    damage.melee += Math.max(0, sender.modified.damage.melee - receiver.modified.defence.meleeUnits / 2);
                }
                return damage;

            default: return damage;
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

    private static minimalDamage(damage: CharPower, defaultDamage: number): CharPower {
        return {
            magic: Math.min(damage.magic, defaultDamage),
            range: Math.min(damage.range, defaultDamage),
            melee: Math.min(damage.melee, defaultDamage),
        };
    }

    private static adjustDamage(damage: CharPower, adjustment: number): CharPower {
        return this.minimalDamage(damage, adjustment);
    }

    private static handleGhost(damage: CharPower, receiver: Character, sender: Character): CharPower {
        let correctedGhostDamage = this.minimalDamage(damage, 1).magic;
        if (receiver.modified.hp - correctedGhostDamage < 1 && sender.modified.defence.deathMagic <= DEATH_MAGIC_THRESHOLD * sender.modified.maxMoves) {
            sender.kill();
        }
        return { magic: damage.magic, range: 0, melee: 0 };
    }

    private static handleDeathCurse(damage: CharPower, receiver: Character, sender: Character): CharPower {
        let correctedCurseDamage = this.minimalDamage(damage, 1).magic;
        if (receiver.modified.hp - correctedCurseDamage < 1) {
            sender.kill();
        }
        return damage;
    }
}