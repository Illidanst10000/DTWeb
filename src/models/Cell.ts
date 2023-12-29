
import {Character} from "./characters/Character";
import {Board} from "./Board";
import {PlayerType} from "./PlayerType";
import AttackTurnService from "../services/AttackTurnService";
import {Army} from "./armies/Army";

export enum CellType {
    TENT = "tent",
    RANGE = "range",
    MELEE = "melee"
}

export class Cell {

    readonly x: number;
    readonly y: number;
    character: Character | null;
    readonly cellType: CellType;
    readonly playerType: PlayerType;
    army: Army;
    available: boolean;
    id: number


    constructor(x: number, y: number, character: Character | null, cellType: CellType, playerType: PlayerType,
                army: Army) {
        this.x = x;
        this.y = y;
        this.character = character;
        this.cellType = cellType;
        this.playerType = playerType
        this.army = army;
        this.available = false;
        this.id = Math.random();
    }

    isEnemyCellType(target: Cell): boolean {
        if (target.cellType !== this.cellType) {
            return true
        }
        return false
    }

    isEmpty() {
        return this.character === null
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyTent(target: Cell): boolean {
        if (target.cellType === CellType.TENT && !target.character) {
            return true
        }
        return false
    }

    setCharacter(character: Character) {
        this.character = character;
        this.character.cell = this
    }

    moveCharacter(target: Cell) {
        if(this.character && this.character?.canMove(target)) {
            this.character?.moveCharacter(target)
            AttackTurnService.handleCharTurn(this.character)
            target.setCharacter(this.character)
            this.character = null;
        }
    }

    removeCharacter() {
        this.character = null;
    }

}