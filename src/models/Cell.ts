import {CellType} from "./CellType";
import {Character} from "./characters/Character";
import {Army} from "./Army";

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
        if (character) {
            character.charPos.setCell(this)
        }
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
        this.character.charPos.setCell(this)
        // console.log('setCharacter: ', this)
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
        return target.cellType !== this.cellType;
    }

    getArmy(): Army {
        return this.army
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