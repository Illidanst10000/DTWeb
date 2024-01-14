
import {Character} from "./characters/Character";
import AttackTurnService from "../services/AttackTurnService";
import {Army, armyStructure} from "./Army";

export enum CellType {
    TENT = "tent",
    RANGE = "range",
    MELEE = "melee"
}

export function fieldType(index: number): CellType {
    if (index === 0 || index === armyStructure.maxChars / 2 - 1) {
        return CellType.TENT
    }
    if (index < armyStructure.maxChars / 2) {
        return CellType.RANGE
    }
    return CellType.MELEE
}

export class Cell {

    readonly x: number;
    readonly y: number;
    character: Character | null;
    readonly cellType: CellType;
    army: Army;
    available: boolean;
    id: number


    constructor(x: number, y: number, character: Character | null, cellType: CellType, army: Army) {
        this.x = x;
        this.y = y;
        this.character = character;
        this.cellType = cellType;
        this.army = army;
        this.available = false;
        this.id = Math.random();
    }

    public getCharacter() {
        return this.character;
    }

    setCharacter(character: Character) {
        this.character = character;
        this.character.charPos.y = this.y;
        this.character.charPos.x = this.x;
    }

    removeCharacter() {
        this.character = null;
    }

    isEmpty() {
        return this.character === null
    }

    getCellPos(): number[] {
        return [this.x, this.y]
    }
    isEnemyCellType(target: Cell): boolean {
        if (target.cellType !== this.cellType) {
            return true
        }
        return false
    }



    // isEmptyVertical(target: Cell): boolean {
    //     if (this.x !== target.x) {
    //         return false
    //     }
    //
    //     const min = Math.min(this.y, target.y);
    //     const max = Math.max(this.y, target.y);
    //
    //     for (let y = min + 1; y < max; y++) {
    //         if (!this.board.getCell(this.x, y).isEmpty()) {
    //             return false
    //         }
    //     }
    //     return true
    // }

    // isEmptyHorizontal(target: Cell): boolean {
    //     if (this.y !== target.y) {
    //         return false
    //     }
    //
    //     const min = Math.min(this.x, target.x);
    //     const max = Math.max(this.x, target.x);
    //
    //     for (let x = min + 1; x < max; x++) {
    //         if (!this.board.getCell(x, this.y).isEmpty()) {
    //             return false
    //         }
    //     }
    //     return true
    // }

    // isEmptyTent(target: Cell): boolean {
    //     if (target.cellType === CellType.TENT && !target.character) {
    //         return true
    //     }
    //     return false
    // }




    // moveCharacter(target: Cell) {
    //     if(this.character && this.character?.canMove(target)) {
    //         this.character?.moveCharacter(target)
    //         AttackTurnService.handleCharTurn(this.character)
    //         target.setCharacter(this.character)
    //         this.character = null;
    //     }
    // }


}