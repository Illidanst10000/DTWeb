import {CellType, MELEE, RANGE, TENT} from "./CellType";
import {Cell} from "./Cell";
import {PlayerType} from "./Player";
import {Character} from "./characters/Character";


// TODO: Put the constant in the config. Change initCells() in Army to use configuration values.
export const armyStructure = {
    frontRow: [TENT, MELEE, MELEE, MELEE, MELEE, TENT] as CellType[],
    rangeRow: [TENT, RANGE, RANGE, RANGE, RANGE, TENT] as CellType[],
    rows: 2,
    cells: 6,
    maxChars: 12,
}

type Coordinate = { x: number; y: number };
type CharacterAssignment = { coordinate: Coordinate; character: Character };


export class Army {
    cells: Cell[][] = [];
    playerType: PlayerType;
    constructor(playerType: PlayerType) {
        this.playerType = playerType;
        this.cells = [];
        this.initCells()
    }

    initCells(): Army {
        const rowsOrder = [armyStructure.rangeRow, armyStructure.frontRow];
        const isTop = this.playerType === 'top';

        for (let i = 0; i < armyStructure.rows; i++) {
            const row: Cell[] = [];
            const rowIndex = isTop ? i : armyStructure.rows - 1 - i;
            const cellRow = rowsOrder[rowIndex];

            for (let j = 0; j < armyStructure.cells; j++) {
                row.push(new Cell(j, i, null, cellRow[j], this));
            }

            this.cells.push(row);
        }

        return this
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
            for (let x = minX + 1; x < maxX; x++) {
                if (this.cells[y][x].character) {
                    return false;
                }
            }
            console.log('isHorizontalPathClear')
            return true;
        };

        const isVerticalPathClear = (x: number, minY: number, maxY: number) => {
            for (let y = minY + 1; y < maxY; y++) {
                if (this.cells[y][x].character) {
                    return false; // Character found in the path
                }
            }
            console.log('isVerticalPathClear')
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
            console.log('isDiagonalPathClear')
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
        currentCell.character = null
        targetCell.setCharacter(char)
    }

    // public highlightCells(selectedCell: Cell | null) {
    //     for (let i = 0; i < this.cells.length; i++) {
    //         const row = this.cells[i]
    //         for (let j = 0; j < row.length; j++) {
    //             const target = row[j]
    //
    //             target.available = !!selectedCell?.character?.canMove(target)
    //
    //             if (!target.available) {
    //                 target.available = !!selectedCell?.character?.canAttack(target)
    //             }
    //
    //         }
    //     }
    // }

    
}