import {PlayerType} from "../PlayerType";
import logo from '../../assets/melee.jpg'
import {Cell} from "../Cell";

export interface MeleeCharacter {

}

export interface MageCharacter {
    magicType: string;
    magicDirection: string;
}

export interface RangeCharacter {

}

export interface CharacterHits {
    name: string;
    currentHits: number;
}

export class Character {
    playerType: PlayerType;
    logo: typeof logo | null;
    cell: Cell;
    name: string;
    id: number;
    description: string;
    hits: number;
    currentHits: number;
    attack: number;
    defenceBlow: number;
    defenceShot: number;
    protectLife: number;
    protectDeath: number;
    protectElemental: number;
    initiative: number;
    actions: number;
    vampirism: number;
    regen: number;


constructor(playerType: PlayerType, cell: Cell) {
        this.playerType = playerType;
        this.cell = cell;
        this.cell.character = this;
        this.id = Math.random();
        this.name = '';
        this.logo = null;
        this.description = '';
        this.hits = 0;
        this.currentHits = 0
        this.defenceBlow = 0;
        this.defenceShot = 0;
        this.protectLife = 0;
        this.protectDeath = 0;
        this.protectElemental = 0;
        this.initiative = 0;
        this.actions = 0;
        this.vampirism = 0;
        this.regen = 0;
        this.attack = 0;
    }

    canMove(target: Cell) : boolean {
        if (target.playerType !== this.cell.playerType) {
            return false
        }
        if (target.character?.playerType === this.playerType) {
            return false
        }
        if (this.cell.isEmptyVertical(target)) {
            return true
        }
        if (this.cell.isEmptyHorizontal(target)) {
            return true
        }
        if (this.cell.isEmptyTent(target)) {
            return true
        }
        return false;
    }

    canAttack(target: Cell) : boolean {
        if (target.playerType !== this.playerType && target.character) {
            return true
        }
        return false
    }

    getCharacterCell() {
        return this.cell
    }

    getCharHits (): number {
        return this.hits
    }

    getCharAttack (): number {
        return this.attack
    }
    setCurrentHits(hits: number): void {
        this.currentHits = hits
    }

    moveCharacter(target: Cell) {

    }

    makeTurn() {

    }
}