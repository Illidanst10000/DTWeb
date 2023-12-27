import {PlayerType} from "../PlayerType";
import logo from '../../assets/melee.jpg'
import {Cell} from "../Cell";
import {Modify, ModifyCharStats} from "./CharactersStats";

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
    type: MagicType;
    direction: MagicDirection;
};

export class CharDefence {
    deathMagic: number;
    elementalMagic: number;
    lifeMagic: number;
    handPercent: number;
    rangePercent: number;
    magicUnits: number;
    meleeUnits: number;
    rangeUnits: number;
    constructor(deathMagic: number, elementalMagic: number, lifeMagic: number, handPercent: number, rangePercent: number,
                magicUnits: number, meleeUnits: number, rangeUnits: number) {
        this.deathMagic = deathMagic;
        this.elementalMagic = elementalMagic;
        this.lifeMagic = lifeMagic;
        this.handPercent = handPercent;
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
    magicType: MagicTypeWithDirection | null
    constructor(name: string, description: string, icon: typeof logo | null, persona: typeof logo | null, charType: CharType, magicType: MagicTypeWithDirection | null, playerType: PlayerType, cell: Cell | null) {
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
    effects: []; // Здесь будут эффекты. Пока просто массивом.
    army: string; // Здесь будет армия позже. Пока просто стринг
    modify: ModifyCharStats;
    bonus: []; // Здесь будут бонусы. Пока просто массивом.

    constructor(stats: CharStats, info: CharInfo, inventory: CharInventory, army: string, bonus: [], effects: []) {
        this.stats = stats;
        this.modified = stats;
        this.info = info;
        this.inventory = inventory;
        this.effects = effects;
        this.army = army;
        this.modify = new ModifyCharStats();
        this.bonus = bonus;

        this.recalc();
    }

    recalc() {
        this.modified = this.modify.apply(this.stats);
    }

    healChar(target: Character, damage: CharPower, magicType: MagicType): boolean {
        switch (true) {
            case ([CharType.People].includes(target.info.charType) && magicType === MagicType.Death)
            : return false
            case ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life)
            : return false
            default:
                return target.heal(damage.magic)
        }
    }

    blessChar(target: Character, damage: CharPower, magicType: MagicType): boolean {
        switch (true) {
            case ([CharType.People].includes(target.info.charType) && magicType === MagicType.Death)
            : return false
            case ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life)
            : return false
            // case (!target.hasEffect(MageSupport)): target.addEffect(...... // logic with bless) return true
            default:
                return false
        }
    }

    healBless(target: Character, damage: CharPower, magicType: MagicType): boolean {
        switch (true) {
            case ([CharType.People].includes(target.info.charType) && magicType === MagicType.Death)
            : return false
            case ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life)
            : return false
            case (this.healChar(target, damage, magicType))
            : return this.blessChar(target, damage, magicType);
            default:
                return false
        }
    }

    elementalBless() {

    }

    magicCurse() {

    }

    elementalCurse() {

    }

    magicAttack() {

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

    addEffect() {

    }

    addItem() {

    }

    removeItem() {

    }

    getBonus() {

    }

    getBonusInfo() {

    }

    underAttack() {

    }

    correctDamage() {

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