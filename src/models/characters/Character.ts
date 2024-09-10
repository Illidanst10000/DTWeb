import {CellType, MELEE, RANGE, TENT} from "../CellType";

import logo from '../../assets/melee.jpg'
import {Modify, ModifyCharStats} from "./CharactersStats";
import {AttackMagic, DisableMagic, Effect, EffectKind, ElementalSupport, HealMagic} from "../effects/Effect";
import {calcPerc, logs} from "../../utils";
import {Army, armyStructure} from "../Army";
import {Bonus, Bonuses} from "../bonuses/Bonus";
import {Cell} from "../Cell";

export enum AttackType {
    Melee = "melee-attack",
    Range = "range-attack",
    Magic = "magic-attack",
    Buff = "magic-buff",
    Heal = "heal"
}

export enum MagicDirection {
    ToAlly = 'ToAlly',
    ToAll = 'ToAll',
    ToEnemy = 'ToEnemy',
    CurseOnly = 'CurseOnly',
    StrikeOnly = 'StrikeOnly',
    BlessOnly = 'BlessOnly',
    CureOnly = 'CureOnly',
    Basic = 'Basic',
}

export enum CharType {
    People = 'People',
    Undead = 'Undead'
}

export enum MagicType {
    Life = 'Life',
    Death = 'Death',
    Elemental = 'Elemental',
    Basic = 'Basic'
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
    initiative: number;
    maxInitiative: number;
    vampiring: number;
    regeneration: number;

    constructor(hp: number, maxHp: number, damage: CharPower, defence: CharDefence, moves: number, maxMoves: number,
                initiative: number, maxInitiative: number, vampiring: number, regeneration: number) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.damage = damage;
        this.defence = defence;
        this.moves = moves;
        this.maxMoves = maxMoves;
        this.initiative = initiative;
        this.maxInitiative = maxInitiative;
        this.vampiring = vampiring;
        this.regeneration = regeneration;
    }

    static empty() {
        return new CharStats(0, 0, CharPower.empty(), CharDefence.empty(), 0, 0, 0,0, 0, 0);
    }
}

export class CharInfo {
    name: string;
    id: number;
    description: string;
    icon: typeof logo | null;
    persona: typeof logo | null;
    charType: CharType;
    magicType: MagicTypeWithDirection
    constructor(name: string, description: string, icon: typeof logo | null, persona: typeof logo | null,
                charType: CharType, magicType: MagicTypeWithDirection) {
        this.name = name;
        this.id = Math.random();
        this.description = description;
        this.icon = icon;
        this.persona = persona;
        this.charType = charType;
        this.magicType = magicType;
    }

    static empty() {
        return new CharInfo('', '', null, null, CharType.People, {type: MagicType.Basic, direction: MagicDirection.Basic});
    }
}

export class CharPos {
    cell: Cell | null
    x: number;
    y: number;

    constructor() {
        this.cell = null;
        this.x = 0;
        this.y = 0;
    }

    setCell(cell: Cell) {
        this.cell = cell
        this.x = cell.x
        this.y = cell.y
    }

    getCoordinates() {
        return [this.x, this.y]
    }

    getIndex() {
        return this.x + this.y * Math.floor(12 / 2);
    }

    static empty() {
        return new CharPos();
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
    charPos: CharPos;
    modify: ModifyCharStats;
    bonus: Bonuses;

    constructor(stats: CharStats, info: CharInfo, inventory: CharInventory, bonus: Bonuses, effects: Effect[], charPos: CharPos) {
        this.stats = stats;
        this.modified = stats;
        this.info = info;
        this.inventory = inventory;
        this.effects = effects;
        this.modify = new ModifyCharStats();
        this.bonus = bonus;
        this.charPos = charPos;
        this.reCalc();
    }

    fieldType(index: number): CellType {
        if (index === 0 || index === armyStructure.maxChars / 2 - 1) {
            return TENT
        }
        if (index < armyStructure.maxChars / 2) {
            return RANGE
        }
        return MELEE
    }

    reCalc() {
        // console.log('this.stats: ', this.stats, 'this.modified: ', this.modified, 'this.modify: ', this.modify)
        this.modified = this.modify.apply(this.stats);
    }

    private charTypeCheck(target: Character, magicType: MagicType): boolean {
        return !([CharType.People].includes(target.info.charType) && magicType === MagicType.Death) &&
            !([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life)
    }

    private canHeal(target: Character, magicType: MagicType): boolean {
        return this.charTypeCheck(target, magicType);

    }

    private canBless(target: Character, magicType: MagicType): boolean {
        return this.charTypeCheck(target, magicType) && !target.hasEffectKind(EffectKind.MageSupport)
    }

    private adjustMagicDamage(target: Character, damage: CharPower, magicType: MagicType): void {
        if ([CharType.Undead].includes(target.info.charType) && magicType === MagicType.Life) {
            damage.magic *= 2;
        }
    }

    healChar(target: Character, damage: CharPower, magicType: MagicType): AttackType | null {
        console.log('healChar')
        if (!this.canHeal(target, magicType)) {
            console.log('healchar null')
            return null
        }
        console.log('healed')
        target.heal(damage.magic)
        return AttackType.Heal
    }

    blessChar(target: Character, damage: CharPower, magicType: MagicType): AttackType | null {
        console.log('blessChar')
        if (!this.canBless(target, magicType)) {
            return null;
        }

        target.addEffect(new HealMagic(damage.magic));
        return AttackType.Buff
    }

    healBless(target: Character, damage: CharPower, magicType: MagicType): AttackType | null {

        if (!this.healChar(target, damage, magicType)) {
            return null
        }

        if (this.blessChar(target, damage, magicType)) {
            console.log('bless yes return buff')
            return AttackType.Buff
        }
        console.log('bless no return heal')
        return AttackType.Heal
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
        this.adjustMagicDamage(target, damage, magicType);
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

        this.adjustMagicDamage(target, damage, magicType);
        if (this.magicCurse(target, damage, magicType)) {
            return true
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
        const isEnemy = this.isEnemy(target);
        if (this.isBlocked() || this.isTent(target)) return false
        if (this.canMeleeAttack(target, isEnemy) || this.canRangeAttack(isEnemy)) return true
        return this.canMagicAttack(target, isEnemy)
    }

    attack(target: Character): AttackType | null {
        const isEnemy = this.isEnemy(target);

        if (this.isBlocked() || this.isTent(target)) return null;
        if (this.executeMeleeAttack(target, isEnemy)) return AttackType.Melee;
        if (this.executeRangeAttack(target, isEnemy)) return AttackType.Range;
        const magicAttackType = this.executeMagicAttack(target, isEnemy);
        if (magicAttackType) return magicAttackType;
        return null
    }

    private isEnemy(target: Character) {
        return this.charPos.cell?.getArmy() !== target.charPos.cell?.getArmy();
    }

    private isBlocked(): boolean {
        const charField = this.fieldType(this.charPos.getIndex());
        return charField === TENT;
    }

    private isTent(target: Character): boolean {
        return target.charPos.cell?.cellType === "tent";
    }

    private canMeleeAttack(target: Character, isEnemy: boolean): boolean {

        const damage = this.modified.damage;
        return damage.melee > 0 &&
            this.charPos.y === target.charPos.y &&
            Math.abs(target.charPos.x - this.charPos.x) < 2 &&
            isEnemy
    }

    private canRangeAttack(isEnemy: boolean): boolean {
        const damage = this.modified.damage;
        const charField = this.fieldType(this.charPos.getIndex())
        return damage.range > 0 && charField === RANGE && isEnemy;
    }

    private canMagicAttack(target: Character, isEnemy: boolean): boolean {

        if (!this.info.magicType) return false
        return this.evaluateMagicType(target, isEnemy)
    }

    private executeMeleeAttack(target: Character, isEnemy: boolean): boolean {
        const damage = this.modified.damage
        if (this.canMeleeAttack(target, isEnemy)) {
            damage.range = 0;
            damage.magic = 0;
            target.underAttack(this, damage)
            return true
        }
        return false
    }

    private executeRangeAttack(target: Character, isEnemy: boolean): boolean {
        const damage = this.modified.damage;
        if (this.canRangeAttack(isEnemy)) {
            damage.melee = 0;
            damage.magic = 0;
            target.underAttack(this, damage);
            return true;
        }
        return false;
    }

    private executeMagicAttack(target: Character, isEnemy: boolean): AttackType | null {

        if (!this.info.magicType)  return null;
        return this.applyMagicAttack(target, isEnemy);
    }

    private evaluateMagicType(target: Character, isEnemy: boolean): boolean {
        const magicType = this.info.magicType.type
        const magicDirection = this.info.magicType.direction

        switch (magicDirection) {
            case MagicDirection.ToAlly:
                if (isEnemy) return false
                return this.evaluateMagicToAlly(target, magicType);

            case MagicDirection.ToAll:
                return this.evaluateMagicToAll(target, isEnemy, magicType);

            case MagicDirection.ToEnemy:
            case MagicDirection.CurseOnly:
            case MagicDirection.StrikeOnly:
                return this.evaluateMagicToEnemy(isEnemy, magicType);

            case MagicDirection.BlessOnly:
                return this.evaluateMagicBlessOnly(target, isEnemy, magicType);

            case MagicDirection.CureOnly:
                return this.evaluateMagicCureOnly(target, isEnemy, magicType);

            default:
                return false;
        }
    }

    private evaluateMagicToAlly(target: Character, magicType: MagicType): boolean {
        switch (magicType) {
            case MagicType.Death:
                return target.info.charType !== CharType.People;
            case MagicType.Life:
                return target.info.charType !== CharType.Undead;
            case MagicType.Elemental:
                return !target.hasEffectKind(EffectKind.MageSupport);
            default:
                return false;
        }
    }

    private evaluateMagicToAll(target: Character, isEnemy: boolean, magicType: MagicType): boolean {
        if (isEnemy) {
            return this.fieldType(this.charPos.getIndex()) === RANGE;
        } else {
            return this.evaluateMagicToAlly(target, magicType);
        }
    }

    private evaluateMagicToEnemy(isEnemy: boolean, magicType: MagicType): boolean {
        if (!isEnemy) return false;
        return this.fieldType(this.charPos.getIndex()) === RANGE;
    }

    private evaluateMagicBlessOnly(target: Character, isEnemy: boolean, magicType: MagicType): boolean {
        if (isEnemy) return false;
        return this.evaluateMagicToAlly(target, magicType);
    }

    private evaluateMagicCureOnly(target: Character, isEnemy: boolean, magicType: MagicType): boolean {
        if (isEnemy) return false;
        if (target.modified.hp === target.modified.maxHp) return false
        return this.evaluateMagicToAlly(target, magicType);
    }

    private applyMagicAttack(target: Character, isEnemy: boolean): AttackType | null {
        console.log('applyMagicAttack')
        const magicType = this.info.magicType.type;
        const direction = this.info.magicType.direction;

        switch (direction) {
            case MagicDirection.ToAlly:
                console.log('applyMagicAttack ToAlly')
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:

                        console.log('applyMagicAttack ToAlly Death Life')
                        const type = this.healBless(target, this.modified.damage, magicType)
                        console.log(type)
                            if (type) return type
                        break;
                    case MagicType.Elemental:
                        if (this.elementalBless(target, this.modified.damage)) {
                            return AttackType.Buff;
                        }
                        break;
                }
                console.log('applyMagicAttack ToAlly break')
                break;

            case MagicDirection.CureOnly:
                switch (magicType) {
                    case MagicType.Death:
                    case MagicType.Life:

                        console.log('applyMagicAttack CureOnly Death Life')
                        const type = this.healChar(target, this.modified.damage, magicType)
                        console.log(type)
                        if (type) return type
                        break;
                }
                console.log('applyMagicAttack ToAlly break')
                break;

            case MagicDirection.ToAll:
            case MagicDirection.BlessOnly:

                console.log('applyMagicAttack ToAll BlessOnly CureOnly')
                if (this.blessChar(target, this.modified.damage, magicType)) {
                    return AttackType.Buff;
                }
                break;
            case MagicDirection.ToEnemy:
            case MagicDirection.CurseOnly:
            case MagicDirection.StrikeOnly:
                console.log('applyMagicAttack ToEnemy CurseOnly StrikeOnly')
                if (this.magicAttack(target, this.modified.damage, magicType)) {
                    return AttackType.Magic;
                }
                break;
            default:
                console.log('applyMagicAttack default')
                return null;
        }

        return null;
    }

    heal(amount: number): boolean {
        const effected = this.modified;
        if (effected.maxHp < effected.hp + amount) {
            this.stats.hp = effected.maxHp;
            this.reCalc();
            return true
        }
        this.stats.hp += amount;
        this.reCalc();
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
        this.reCalc();
    }

    hasEffectKind(effectKind: EffectKind): boolean {
        return this.effects.some(effect => effect.getKind && effect.getKind() === effectKind);
    }

    addEffect(effect: Effect): boolean {
        this.effects.push(effect);
        this.effects[this.effects.length - 1].updateStats(this);
        this.reCalc()
        console.log(this.effects)
        return true
    }

    addItem() {
        // TODO: Items
    }

    removeItem() {
        // TODO: Items
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
        correctedDamageUnits = Math.max(correctedDamageUnits, 1);

        this.stats.hp = Math.max(this.stats.hp - correctedDamageUnits, -this.modified.hp);
        this.reCalc();
        if (this.isDead()) this.charPos.cell?.removeCharacter()
        return correctedDamageUnits;
    }

    correctDamage(damage: CharPower, magicType: MagicType): CharPower {
        const { magic, range, melee } = damage;
        const { deathMagic, elementalMagic, lifeMagic, meleePercent, rangePercent,
                magicUnits, meleeUnits, rangeUnits } = this.modified.defence;

        const magicPercent = this.getMagicDefencePercent(magicType, deathMagic, elementalMagic, lifeMagic);

        const adjustedDamage = {
            magic: this.adjustDamage(magic, magicUnits, magicPercent),
            range: this.adjustDamage(range, rangeUnits, rangePercent),
            melee: this.adjustDamage(melee, meleeUnits, meleePercent)
        };

        return adjustedDamage;
    }

    private getMagicDefencePercent(magicType: MagicType, deathMagic: number, elementalMagic: number, lifeMagic: number): number {
        switch (magicType) {
            case MagicType.Life:
                return lifeMagic;
            case MagicType.Death:
                return deathMagic;
            case MagicType.Elemental:
                return elementalMagic;
            default:
                return 0;
        }
    }

    private adjustDamage(damage: number, units: number, percent: number): number {
        const basicPercentage = 100;
        const adjustedDamage = Math.max(damage - units, 0);
        const adjustedDefence = Math.max(basicPercentage - percent, 0);
        return calcPerc(adjustedDamage, adjustedDefence)
    }

    tick(): void {
        const effectsToProcess = [...this.effects];
        this.effects = [];
        for (const effect of effectsToProcess) {
            if (typeof effect.onTick === "function") {
                effect.onTick()
            }

            if (effect.isFinished()) {
                effect.finish(this);
            } else {
                this.effects.push(effect)
            }
        }

    }

     useMove() {
         this.stats.moves -= 1

         if ( this.stats.moves < 1) {
             this.stats.initiative = 0;
         }

         this.reCalc();
    }

    restoreMove() {
        this.tick();
        this.stats.moves = this.modified.maxMoves
        this.stats.initiative = this.modified.maxInitiative
        this.reCalc();
    }
}


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