import {CellType, MELEE, RANGE, TENT} from "./CellType";
import {Cell} from "./Cell";
import {PlayerType} from "./Player";
import {Character} from "./characters/Character";

// TODO: Put the constant in the config. Change initCells() in Army to use configuration values.

type Coordinate = { x: number; y: number };
export type CharacterAssignment = { coordinate: Coordinate; character: Character };
export const armyStructure = {
    frontRow: [TENT, MELEE, MELEE, MELEE, MELEE, TENT] as CellType[],
    rangeRow: [TENT, RANGE, RANGE, RANGE, RANGE, TENT] as CellType[],
    rows: 2,
    cells: 6,
    maxChars: 12,
}
const rowsOrder = [armyStructure.rangeRow, armyStructure.frontRow]

export class Army {
    cells: Cell[][] = [];
    playerType: PlayerType;
    constructor(playerType: PlayerType) {
        this.playerType = playerType;
        this.initCells()
        console.log(this.cells)
    }

    initCells() {
        console.log('initcells')
        if (this.playerType === PlayerType.FIRST) {
            for (let yIndex = 0; yIndex < armyStructure.rows; yIndex++) {
                this.initRow(yIndex, rowsOrder)
            }
            return
        }

        if (this.playerType === PlayerType.SECOND){
            for (let yIndex = armyStructure.rows - 1; yIndex >= 0 ; yIndex--) {
                this.initRow(yIndex, rowsOrder)
            }
            return
        }

        return new Error('Error initializing cells')
    }

    initRow(yIndex: number, rowsOrder: CellType[][]){
        const row: Cell[] = []
        const cellRow = rowsOrder[yIndex];
        for (let xIndex = 0; xIndex < armyStructure.cells; xIndex++) {
            row.push(new Cell(xIndex, yIndex, null, cellRow[xIndex], this))
        }
        this.cells.push(row)
    }

    assignCharacters(assignments: CharacterAssignment[]): void {
        assignments.forEach(({ coordinate, character }) => {
            const { x, y } = coordinate;
            if (this.isValidCoordinate(x, y)) {
                const cell = this.cells[y][x];
                if (cell.character) {
                    console.warn(`Cell at (${x}, ${y}) already has a character`);
                    return;
                }

                cell.setCharacter(character);

            } else {
                console.warn(`Invalid coordinate (${x}, ${y})`);
            }
        });
    }

    isValidCoordinate(x: number, y: number): boolean {
        return x >= 0 && x < armyStructure.cells && y >= 0 && y < armyStructure.rows;
    }

    canMove(currentCell: Cell, targetCell: Cell) {
        if (!currentCell.character) throw new Error("No character in cell")
        if (currentCell.army !== targetCell.army ) return false
        if (targetCell.character) return false
        if (targetCell.cellType === TENT) return true

        const isHorizontalPathClear = (y: number, minX: number, maxX: number) => {
            const row = this.cells.find(row => row.some(cell => cell.y === y));
            if (!row) {
                throw new Error(`Row ${y} is not initialized`);
            }

            for (let x = minX + 1; x < maxX; x++) {
                if (row.some(cell => cell.x === x && cell.character)) {
                    return false;
                }
            }

            return true;
        };

        const isVerticalPathClear = (x: number, minY: number, maxY: number) => {
            for (let y = minY + 1; y < maxY; y++) {
                if (this.cells[y][x].character) {
                    return false; // Character found in the path
                }
            }

            return true;
        };

        const isDiagonalPathClear = (startX: number, startY: number, endX: number, endY: number) => {
            const xStep = startX < endX ? 1 : -1;
            const yStep = startY < endY ? 1 : -1;
            let x = startX + xStep;
            let y = startY + yStep;
            while (x !== endX && y !== endY) {
                if (this.cells[y][x].character) {
                    return false; // Character found in the path
                }
                x += xStep;
                y += yStep;
            }

            return true;
        };

        // Handle horizontal movement
        if (currentCell.y === targetCell.y) {
            const minX = Math.min(currentCell.x, targetCell.x);
            const maxX = Math.max(currentCell.x, targetCell.x);
            return isHorizontalPathClear(currentCell.y, minX, maxX);
        }

        // Handle vertical movement
        if (currentCell.x === targetCell.x) {
            const minY = Math.min(currentCell.y, targetCell.y);
            const maxY = Math.max(currentCell.y, targetCell.y);
            return isVerticalPathClear(currentCell.x, minY, maxY);
        }

        // Handle diagonal movement
        const deltaX = Math.abs(currentCell.x - targetCell.x);
        const deltaY = Math.abs(currentCell.y - targetCell.y);
        if (deltaX === deltaY) {
            return isDiagonalPathClear(currentCell.x, currentCell.y, targetCell.x, targetCell.y);
        }
    }

    move(currentCell: Cell, targetCell: Cell) {
        const char = currentCell.character
        if (!char) return
        char.useMove()
        currentCell.character = null
        targetCell.setCharacter(char)
    }
}