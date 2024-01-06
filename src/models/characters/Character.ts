import {PlayerType} from "../PlayerType";
import logo from '../../assets/melee.jpg'
import {Cell, CellType, fieldType} from "../Cell";
import {ModifyCharStats} from "./CharactersStats";
import {AttackMagic, DisableMagic, Effect, EffectKind, ElementalSupport, HealMagic} from "../effects/Effect";
import {calcPerc} from "../../utils";
import {Army} from "../armies/Army";
import {Bonus, Bonuses} from "../bonuses/Bonus";

export enum MagicDirection {
    ToAlly = 'ToAlly',
    ToAll = 'ToAll',
    ToEnemy = 'ToEnemy',
    CurseOnly = 'CurseOnly',
    StrikeOnly = 'StrikeOnly',
    BlessOnly = 'BlessOnly',
    CureOnly = 'CureOnly',
}

export enum CharType {
    People = 'People',
    Undead = 'Undead'
}

export enum MagicType {
    Life = 'Life',
    Death = 'Death',
    Elemental = 'Elemental',
}

export type MagicTypeWithDirection = {
    type: MagicType
    direction: MagicDirection
};

export class CharDefence {
    deathMagic: number;
    elementalMagic: number;
    lifeMagic: number;
    meleePercent: number;
    rangePercent: number;
    magicUnits: number;
    meleeUnits: number;
    rangeUnits: number;
    constructor(deathMagic: number, elementalMagic: number, lifeMagic: number, handPercent: number, rangePercent: number,
                magicUnits: number, meleeUnits: number, rangeUnits: number) {
        this.deathMagic = deathMagic;
        this.elementalMagic = elementalMagic;
        this.lifeMagic = lifeMagic;
        this.meleePercent = handPercent;
        this.rangePercent = rangePercent;
        this.magicUnits = magicUnits;
        this.meleeUnits = meleeUnits
        this.rangeUnits = rangeUnits;
    }

    static empty() {
        return new CharDefence(0, 0,0, 0, 0, 0, 0, 0);
    }
}

export class CharPower {
    magic: number;
    range: number;
    melee: number;
    constructor(magic: number, range: number, melee: number) {
        this.magic = magic;
        this.range = range;
        this.melee = melee;
    }

    static empty() {
        return new CharPower(0, 0, 0);
    }
}

export class CharStats {
    hp: number;
    maxHp: number;
    damage: CharPower;
    defence: CharDefence
    moves: number;
    maxMoves: number;
    initiative: number
    vamp: number;
    regen: number;

    constructor(hp: number, maxHp: number, damage: CharPower, defence: CharDefence, moves: number, maxMoves: number,
                initiative: number, vamp: number, regen: number) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.damage = damage;
        this.defence = defence;
        this.moves = moves;
        this.maxMoves = maxMoves;
        this.initiative = initiative;
        this.vamp = vamp;
        this.regen = regen;
    }

    static empty() {
        return new CharStats(0, 0, CharPower.empty(), CharDefence.empty(), 0, 0, 0, 0, 0);
    }
}

export class CharInfo {
    name: string;
    playerType: PlayerType;
    cell: Cell | null;
    id: number;
    description: string;
    icon: typeof logo | null;
    persona: typeof logo | null;
    charType: CharType;
    magicType: MagicTypeWithDirection
    constructor(name: string, description: string, icon: typeof logo | null, persona: typeof logo | null,
                charType: CharType, magicType: MagicTypeWithDirection, playerType: PlayerType, cell: Cell | null) {
        this.name = name;
        this.playerType = playerType;
        this.cell = cell;
        this.id = Math.random();
        this.description = description;
        this.icon = icon;
        this.persona = persona;
        this.charType = charType;
        this.magicType = magicType;
    }

    static empty() {
        return new CharInfo('', '', null, null, CharType.People, {type: MagicType.Life, direction: MagicDirection.ToAlly}, PlayerType.FIRST, null);
    }
}

export class CharPos {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getCoordinates() {
        return [this.x, this.y]
    }

    getIndex() {
        return this.x + this.y * Math.floor(12 / 2);
    }
    static empty() {
        return new CharPos(0, 0);
    }

}

export class CharInventory {
    items: [];
    constructor(items: []) {
        this.items = items || [];
    }

    static empty() {
        return new CharInventory([]);
    }
}

export class Character {
    stats: CharStats;
    modified: CharStats;
    info: CharInfo;
    inventory: CharInventory;
    effects: Effect[];
    army: Army | null;
    charPos: CharPos;
    modify: ModifyCharStats;
    bonus: Bonuses;

    constructor(stats: CharStats, info: CharInfo, inventory: CharInventory, army: Army, bonus: Bonuses, effects: Effect[], charPos: CharPos) {
        this.stats = stats;
        this.modified = stats;
        this.info = info;
        this.inventory = inventory;
        this.effects = effects;
        this.army = army;
        this.modify = new ModifyCharStats();
        this.bonus = bonus;
        this.charPos = charPos;
        this.recalc();
    }

    recalc() {
        this.modified = this.modify.apply(this.stats);
    }

    healChar(target: Character, damage: CharPower, magicType: MagicType): boolean {
        if ([CharType.People].includes(target.info.charType) && magicType === MagicType.Death) {
            return false;
        }
        if ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life) {
            return false;
        }

        return target.heal(damage.magic);
    }

    blessChar(target: Character, damage: CharPower, magicType: MagicType): boolean {
        if ([CharType.People].includes(target.info.charType) && magicType === MagicType.Death) {
            return false;
        }
        if ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life) {
            return false;
        }
        if (target.hasEffectKind(EffectKind.MageSupport)) {
            return false;
        }

        target.addEffect(new HealMagic(damage.magic));
        return true
    }

    healBless(target: Character, damage: CharPower, magicType: MagicType): boolean {
        if ([CharType.People].includes(target.info.charType) && magicType === MagicType.Death) {
            return false;
        }
        if ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life) {
            return false;
        }

        return this.healChar(target, damage, magicType) && this.blessChar(target, damage, magicType);
    }

    elementalBless(target: Character, damage: CharPower): boolean {
        if (target.hasEffectKind(EffectKind.MageSupport)) {
            return false
        }

        target.addEffect(new ElementalSupport(damage.magic))
        return true
    }

    magicCurse(target: Character, damage: CharPower, magicType: MagicType) :boolean {
        if (target.hasEffectKind(EffectKind.MageCurse)) {
            return false
        }
        if (!this.info.magicType) {
            return false
        }
        if ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life) {
            damage.magic *= 2;
        }

        target.addEffect(new AttackMagic(target.correctDamage(damage, this.info.magicType.type).magic))
        return true;
    }

    elementalCurse(target: Character, damage: CharPower): boolean {
        if (target.hasEffectKind(EffectKind.MageCurse)) {
            return false
        }

        if (!this.info.magicType) {
            return false
        }

        target.addEffect(new DisableMagic(target.correctDamage(damage, this.info.magicType.type).magic))
        return true;
    }

    magicAttack(target: Character, damage: CharPower, magicType: MagicType): boolean {
        if ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life) {
            damage.magic *= 2;
        }

        if (this.magicCurse(target, damage, magicType)) {
            return false
        }

        damage.melee = 0;
        damage.range = 0;
        target.underAttack(this, damage);

        return true;
    }

    elementalAttack(target: Character, damage: CharPower): boolean {
        if (!this.elementalCurse(target, damage)) {
            damage.melee = 0;
            damage.range = 0;
            target.underAttack(this, damage)
        }
        return true
    }

    canAttack(target: Character): boolean {
        // TODO: flank attack check
        const effected = this.modified;
        const isEnemy = this.army !== target.army;
        const charField = fieldType(this.charPos.getIndex());
        const targetField = fieldType(target.charPos.getIndex());
        const damage = effected.damage;

        if (charField === CellType.TENT || targetField === CellType.TENT) {
            return false;
        }

        if (damage.melee > 0
            && this.charPos.y === target.charPos.y
            && Math.abs(target.charPos.x - this.charPos.x) < 2
            && isEnemy) {
            return true
        }

        if (damage.range > 0
            && charField === CellType.RANGE
            && isEnemy) {
            return true
        }

        if (!this.info.magicType) {
            return false;
        }

        const magicType = this.info.magicType.type
        const direction = this.info.magicType.direction;

        switch (direction) {
            case MagicDirection.ToAlly:
                switch (magicType) {
                    case MagicType.Death:
                        if (target.info.charType === CharType.People) {
                            return false;
                        }
                        break;
                    case MagicType.Life:
                        if (target.info.charType === CharType.Undead) {
                        return false;
                    }
                        break;
                    case MagicType.Elemental:
                        return !target.hasEffectKind(EffectKind.MageSupport);
                }
                break;

            case MagicDirection.ToAll:
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:
                        if (isEnemy && charField === CellType.RANGE) {
                            return true
                        }
                        switch (target.info.charType) {
                            case CharType.People:
                                if (magicType === MagicType.Death) {
                                    return false;
                                }
                                break;
                            case CharType.Undead:
                                if (magicType === MagicType.Life) {
                                    return false
                                }
                                break;
                        }
                        break;
                    case MagicType.Elemental:
                        return isEnemy
                            ? charField === CellType.RANGE
                            : !target.hasEffectKind(EffectKind.MageSupport);
                }
                break;

            case MagicDirection.ToEnemy:
            case MagicDirection.CurseOnly:
            case MagicDirection.StrikeOnly:
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Elemental:
                    case MagicType.Life:
                        return isEnemy ? charField === CellType.RANGE : false;
                }
                break;

            case MagicDirection.BlessOnly:
                if (isEnemy) {
                    return false;
                }
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:
                        switch (target.info.charType) {
                            case CharType.People:
                                if (magicType === MagicType.Death) {
                                    return false
                                }
                                break;
                            case CharType.Undead:
                                if (magicType === MagicType.Life) {
                                    return false;
                                }
                                break;
                        }
                        break;
                    case MagicType.Elemental:
                        return !target.hasEffectKind(EffectKind.MageSupport);
                }
                break;

            case MagicDirection.CureOnly:
                if (isEnemy || magicType === MagicType.Elemental) {
                    return false
                }
                switch (target.info.charType) {
                    case CharType.People:
                        if (magicType === MagicType.Death) {
                            return false;
                        }
                        break;
                    case CharType.Undead:
                        if (magicType === MagicType.Life) {
                            return false;
                        }
                        break;
                }
                break;
        }
        return false;
    }

    attack(target: Character): boolean {
        const effected = this.modified;
        const isEnemy = this.army !== target.army;
        const charField = fieldType(this.charPos.getIndex());
        const targetField = fieldType(target.charPos.getIndex());
        const damage = effected.damage;

        if (charField === CellType.TENT || targetField === CellType.TENT) {
            return false;
        }

        if (damage.range > 0
            && ((this.charPos.y === target.charPos.y && Math.abs(this.charPos.x - target.charPos.x) < 2)
                || charField === CellType.RANGE)
            && isEnemy) {
                damage.melee = 0;
                damage.magic = 0;
                target.underAttack(this, damage);
                return true;
        }

        if (damage.melee > 0
            && this.charPos.y === target.charPos.y
            && Math.abs(target.charPos.x - this.charPos.x) < 2
            && charField === CellType.MELEE
            && isEnemy) {
                damage.range = 0;
                damage.magic = 0;
                target.underAttack(this, damage);
                return true
        }

        if (!this.info.magicType) {
            return false;
        }

        const magicType = this.info.magicType.type
        const direction = this.info.magicType.direction;

        switch (direction) {
            case MagicDirection.ToAlly:
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:
                        return this.healBless(target, damage, magicType)
                    case MagicType.Elemental:
                        return this.elementalBless(target, damage)
                }
                break;

            case MagicDirection.ToAll:
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:
                        if (isEnemy) {
                            if (charField !== CellType.RANGE) {
                                return false;
                            }
                            return this.magicAttack(target, damage, magicType);
                        } else {
                            return this.healBless(target, damage, magicType);
                        }

                    case MagicType.Elemental:
                        if (isEnemy) {
                            if (charField !== CellType.RANGE) {
                                return false;
                            }
                            return this.elementalAttack(target, damage)
                        } else {
                            return this.elementalBless(target, damage)
                        }
                }
                break;

            case MagicDirection.ToEnemy:
                if (charField !== CellType.RANGE && !isEnemy) {
                    return false
                }
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:
                        return this.magicAttack(target, damage, magicType);
                    case MagicType.Elemental:
                        return this.elementalAttack(target, damage);
                }

                break;

            case MagicDirection.CurseOnly:
                if (!isEnemy) {
                    return false
                }
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:
                        return this.magicAttack(target, damage, magicType);
                    case MagicType.Elemental:
                        return this.elementalAttack(target, damage);
                }

                break;

            case MagicDirection.StrikeOnly:
                if (isEnemy) {
                    damage.melee = 0;
                    damage.range = 0;
                    target.underAttack(this, damage);
                    return true
                }

                break;

            case MagicDirection.BlessOnly:
                if (isEnemy) {
                    return false;
                }
                    switch (magicType) {
                        case MagicType.Death:
                        case MagicType.Life:
                            return this.blessChar(target, damage, magicType);
                        case MagicType.Elemental:
                            return this.elementalBless(target, damage);
                    }
                break;

            case MagicDirection.CureOnly:
                if (!isEnemy) {
                    if (magicType === MagicType.Life || magicType === MagicType.Death) {
                        this.healChar(target, damage, magicType)
                    }
                }
                break;

            default: return false;
        }
        return false;
    }

    heal(amount: number): boolean {
        const effected = this.modified;
        if (effected.maxHp < effected.hp + amount) {
            this.stats.hp = effected.maxHp;
            this.recalc();
            return true
        }
        this.stats.hp += amount;
        this.recalc();
        return false;
    }

    getEffectedStats(): CharStats {
        return this.modified;
    }

    isDead(): boolean {
        return this.modified.hp < 1;
    }

    kill(): void {
        this.stats.hp = -this.modified.hp;
        this.recalc();
    }

    hasEffectKind(effectKind: EffectKind): boolean {
        this.effects.forEach((effect) => {
            if (effect.getKind && effect.getKind() === effectKind) {
                return true
            }
        })
        return false
    }

    addEffect(effect: Effect): boolean {
        this.effects.push(effect);
        const lastEffect = this.effects[this.effects.length - 1];
        lastEffect.updateStats(this)
        this.recalc()
        return true
    }

    addItem() {

    }

    removeItem() {

    }

    getBonus(): Bonuses {
        // TODO: Items bonuses.
        return this.bonus;
    }

    getBonusInfo() {

    }

    underAttack(sender: Character, damage: CharPower): number {
        let correctedDamage = this.correctDamage(damage, sender.info.magicType.type);
        const senderBonus = sender.getBonus();
        correctedDamage = Bonus.onAttacking(senderBonus, correctedDamage, this, sender);
        correctedDamage = Bonus.onAttacked(this.getBonus(), correctedDamage, this, sender);
        let correctedDamageUnits = correctedDamage.melee + correctedDamage.range + correctedDamage.magic;
        if (correctedDamageUnits === 0) {
            correctedDamageUnits = 1;
        }
        if (correctedDamageUnits > this.modified.hp) {
            this.stats.hp = -this.modified.hp;
        } else {
            this.stats.hp -= correctedDamageUnits;
        }
        this.recalc();
        return correctedDamageUnits;
    }

    correctDamage(damage: CharPower, magicType: MagicType): CharPower {
        const { magic, range, melee } = damage;
        const { deathMagic, elementalMagic, lifeMagic, meleePercent, rangePercent,
            magicUnits, meleeUnits, rangeUnits } = this.modified.defence;
        const basicPercentage = 100;

        const magicPercent =
            magicType === MagicType.Life ? lifeMagic :
            magicType === MagicType.Death ? deathMagic :
            magicType === MagicType.Elemental ? elementalMagic : 0;

        const adjustDamage = (damage: number, units: number) => Math.max(damage - units, 0);
        const adjustDefence = (defence: number) => Math.max(basicPercentage - defence, 0);

        const adjustedMagic = adjustDamage(magic, magicUnits);
        const adjustedRange = adjustDamage(range, rangeUnits);
        const adjustedMelee = adjustDamage(melee, meleeUnits);

        return {
            magic: calcPerc(adjustedMagic, adjustDefence(magicPercent)),
            range: calcPerc(adjustedRange, adjustDefence(rangePercent)),
            melee: calcPerc(adjustedMelee, adjustDefence(meleePercent))
        };
    }

    tick() {

    }
}



//
//     canMove(target: Cell): boolean {
//         if (target.playerType !== this.cell.playerType) {
//             return false
//         }
//         if (target.character?.playerType === this.playerType) {
//             return false
//         }
//         if (this.cell.isEmptyVertical(target)) {
//             return true
//         }
//         if (this.cell.isEmptyHorizontal(target)) {
//             return true
//         }
//         if (this.cell.isEmptyTent(target)) {
//             return true
//         }
//         return false;
//     }
//
//     canAttack(target: Cell): boolean {
//         if (target.playerType !== this.playerType && target.character) {
//             return true
//         }
//         return false
//     }
//
//     resetStats() {
//         this.currentActions = this.actions
//         this.currentInitiative = this.initiative
//     }
//
//     hasActions(): boolean {
//         if (this.currentActions > 0) {
//             return true
//         }
//         return false
//     }
//
//     getCharacterCell() {
//         return this.cell
//     }
//
//     useAction() {
//         this.currentActions = this.currentActions - 1;
//     }
//
//     getCurrentHits(): number {
//         return this.currentHits
//     }
//
//     getCharAttack(): number {
//         return this.attack
//     }
//
//     setCurrentHits(hits: number): void {
//         this.currentHits = hits
//     }
//
//     moveCharacter(target: Cell) {
//
//     }
//
//     makeTurn() {
//
//     }
// }