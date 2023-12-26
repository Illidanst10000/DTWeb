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

export class Character {
    playerType: PlayerType;
    logo: typeof logo | null;
    persona: typeof logo | null;
    cell: Cell;
    name: string;
    id: number;
    description: string;
    defenceBlow: number;
    defenceShot: number;
    protectLife: number;
    protectDeath: number;
    protectElemental: number;
    vampirism: number;
    regen: number;

    hits: number;
    currentHits: number;

    initiative: number;
    currentInitiative: number;
    actions: number;
    currentActions: number;
    attack: number;



    constructor(playerType: PlayerType, cell: Cell) {
        this.playerType = playerType;
        this.cell = cell;
        this.cell.character = this;
        this.id = Math.random();
        this.name = '';
        this.logo = null;
        this.persona = null;
        this.description = '';
        this.defenceBlow = 0;
        this.defenceShot = 0;
        this.protectLife = 0;
        this.protectDeath = 0;
        this.protectElemental = 0;
        this.vampirism = 0;
        this.regen = 0;

        this.hits = 0;
        this.currentHits = 0

        this.initiative = 0;
        this.currentInitiative = 0;

        this.actions = 0;
        this.currentActions = 0;

        this.attack = 0;
    }

    canMove(target: Cell): boolean {
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

    canAttack(target: Cell): boolean {
        if (target.playerType !== this.playerType && target.character) {
            return true
        }
        return false
    }

    resetStats() {
        this.currentActions = this.actions
        this.currentInitiative = this.initiative
    }

    hasActions(): boolean {
        if (this.currentActions > 0) {
            return true
        }
        return false
    }

    getCharacterCell() {
        return this.cell
    }

    useAction() {
        this.currentActions = this.currentActions - 1;
    }

    getCurrentHits(): number {
        return this.currentHits
    }

    getCharAttack(): number {
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