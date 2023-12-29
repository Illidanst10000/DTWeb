import {PlayerType} from "../PlayerType";
import logo from '../../assets/melee.jpg'
import {Cell} from "../Cell";
import {ModifyCharStats} from "./CharactersStats";
import {AttackMagic, DisableMagic, Effect, EffectKind, ElementalSupport, HealMagic} from "../effects/Effect";
import {calcPerc} from "../../utils";

export enum MagicDirection {
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
    type: MagicType | null;
    direction: MagicDirection | null;
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
    magicType: MagicType | null
    constructor(name: string, description: string, icon: typeof logo | null, persona: typeof logo | null,
                charType: CharType, magicType: MagicType | null, playerType: PlayerType, cell: Cell | null) {
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
        return new CharInfo('', '', null, null, CharType.People, null, PlayerType.FIRST, null);
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
    effects: Effect[]; // Здесь будут эффекты. Пока просто массивом.
    army: string; // Здесь будет армия позже. Пока просто стринг
    modify: ModifyCharStats;
    bonus: []; // Здесь будут бонусы. Пока просто массивом.

    constructor(stats: CharStats, info: CharInfo, inventory: CharInventory, army: string, bonus: [], effects: Effect[]) {
        this.stats = stats;
        this.modified = stats;
        this.info = info;
        this.inventory = inventory;
        this.effects = effects;
        this.army = army;
        this.modify = new ModifyCharStats();
        this.bonus = bonus;

        this.reсalc();
    }

    reсalc() {
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

        target.addEffect(new AttackMagic(target.correctDamage(damage, this.info.magicType).magic))
        return true;
    }

    elementalCurse(target: Character, damage: CharPower): boolean {
        if (target.hasEffectKind(EffectKind.MageCurse)) {
            return false
        }

        if (!this.info.magicType) {
            return false
        }

        target.addEffect(new DisableMagic(target.correctDamage(damage, this.info.magicType).magic))
        return true;
    }

    magicAttack(target: Character, damage: CharPower, magicType: MagicType) {
        if ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life) {
            damage.magic *= 2;
        }

        if (this.magicCurse(target, damage, magicType)) {
            return false
        }

        damage.melee = 0;
        damage.range = 0;
        //TODO: require beingAttacked func
    }

    elementalAttack() {

    }

    getMagicDirection() {

    }

    canAttackChar() {

    }

    attack() {

    }

    heal(amount: number):boolean {
        return false
    }

    getEffectedStats() {

    }

    isDead() {

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

    getBonus() {

    }

    getBonusInfo() {

    }

    underAttack(sender: Character, damage: CharPower) {

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

        // const adjustedMagicDef = Math.max(basicPercentage - magicDef, 0);
        // const adjustedMagic = Math.max(damage.magic - magicUnits, 0);
        //
        // const adjustedRangeDef = Math.max(basicPercentage - rangePercent, 0);
        // const adjustedRange = Math.max(damage.range - rangeUnits, 0);
        //
        // const adjustedMeleeDef = Math.max(basicPercentage - meleePercent, 0);
        // const adjustedMelee = Math.max(damage.melee - meleeUnits, 0);
        //
        // return {
        //     magic: calcPerc(adjustedMagic, adjustedMagicDef),
        //     range: calcPerc(adjustedRange, adjustedRangeDef),
        //     melee: calcPerc(adjustedMelee, adjustedMeleeDef)
        // }
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