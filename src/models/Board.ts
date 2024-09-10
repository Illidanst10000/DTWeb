
import {Army} from "./Army";
import {Bonus, Bonuses} from "./bonuses/Bonus";
import {Cell} from "./Cell";
import {Modify} from "./characters/CharactersStats";

export const MaxRounds = 25;

export class Board {
    firstArmy: Army;
    secondArmy: Army;
    winner: Army | null;
    activeCell: Cell | null;
    roundsCount: number;

    constructor(firstArmy: Army, secondArmy: Army, activeCell: Cell | null) {
        this.firstArmy = firstArmy
        this.secondArmy = secondArmy
        this.winner = null;
        this.activeCell = null;
        this.roundsCount = 0;
        this.activeCell = activeCell
    }

    public start() {
        this.initializeArmy(this.firstArmy);
        this.initializeArmy(this.secondArmy);
        this.searchNextActive();
    }

    public initializeArmy(army: Army): void {
        army.cells.forEach((cellRow) => {
            cellRow.forEach((cell) => {
                let char = cell.getCharacter();
                if (char) {
                    let bonus = char?.getBonus();
                    Bonus.onBattleStart(bonus, char);
                    char.bonus = bonus;
                    char.reCalc();
                }
            })
        })
    }

    private getCellInitiative(cell: Cell): number {
        return cell.character ? cell.character.modified.initiative : -1;
    }

    private findMaxInitiativeCell(cells: Cell[][]): {cell: Cell, rowIndex: number, colIndex: number} {
        return cells.reduce((maxCell, currentRow, rowIndex) => {
            currentRow.forEach((currentCell, colIndex) => {
                if (!this.isCellInactive(currentCell) && this.getCellInitiative(currentCell) > this.getCellInitiative(maxCell.cell)) {
                    maxCell = {cell: currentCell, rowIndex, colIndex};
                }
            });
            return maxCell;
        }, { cell: cells[0][0], rowIndex: 0, colIndex: 0});
    }

    private isCellInactive(cell: Cell): boolean {
        return !cell.character || cell.character.modified.moves < 1 || cell.character.isDead();
    }


    searchNextActive(): Cell {
        // console.log('search next active| board.activeCell: ', this.activeCell)
        if (!this.firstArmy.cells.length || !this.secondArmy.cells.length) {
            throw new Error("Invalid army cells");
        }

        this.checkRowFall()

        const firstArmyNext = this.findMaxInitiativeCell(this.firstArmy.cells).cell;
        const secondArmyNext = this.findMaxInitiativeCell(this.secondArmy.cells).cell;

        const firstArmyInactive = this.isCellInactive(firstArmyNext)
        const secondArmyInactive = this.isCellInactive(secondArmyNext)

        const firstArmyInitiative = this.getCellInitiative(firstArmyNext)
        const secondArmyInitiative = this.getCellInitiative(secondArmyNext)

        if (firstArmyInactive && secondArmyInactive) {
            this.activeCell = this.nextTurnRound();
            return this.activeCell;
        }

        if (firstArmyInitiative > secondArmyInitiative) {
            // console.log('return first army')
            this.activeCell = firstArmyNext;
            return this.activeCell;
        }
        // console.log('return second army')
        this.activeCell = secondArmyNext;
        return this.activeCell;
    }

    private processArmyCells(army: Army, activeCell: Cell): void {
        army.cells.forEach(cellRow => {
            cellRow.forEach(cell => this.checkAndMarkAvailability(activeCell, cell));
        });
    }

    // check for possible actions to cells and highlight them
    searchInteractions(): void {
        // console.log('search interactions | board.activeCell: ', this.activeCell)
        if (!this.activeCell || !this.activeCell.character) {
            console.log('Inactive cell or character', this.activeCell);
            return;
        }

        // console.log('Searching interactions for active cell');
        this.processArmyCells(this.firstArmy, this.activeCell);
        this.processArmyCells(this.secondArmy, this.activeCell);
    }

    private checkAndMarkAvailability(activeCell: Cell, targetCell: Cell): void {
        // console.log('active cell:', activeCell, 'targetCell: ', targetCell)
        const activeChar = activeCell.character!;
        targetCell.available = false
        // One army -> can move?
        if (activeCell.army === targetCell.army) {
            if (activeCell.army.canMove(activeCell, targetCell)) {
                targetCell.available = true;
            }
        }

        // Can attack?
        if (targetCell.character && activeChar.canAttack(targetCell.character)) {
            targetCell.available = true;
        }


    }

    restoreMoves(cells: Cell[][]): void {
        for (let cellRow of cells) {
            for (let cell of cellRow) {
                let char = cell.character;
                if (char) {
                   char.restoreMove()
                }
            }
        }
    }

    nextTurnRound() {
        this.restoreMoves(this.firstArmy.cells)
        this.restoreMoves(this.secondArmy.cells)

        this.roundsCount += 1;
        return this.searchNextActive();
        // this.checkWin();
    }

    checkWin(): boolean {
        function checkArmyLost(army: Army): boolean {
            const chars = [];
            for (let cellRow of army.cells) {
                for (let cell of cellRow) {
                    let char = cell.character;
                    if (char) {
                        chars.push(char);
                    }
                }
            }
            return !chars;
        }

        if (this.roundsCount === MaxRounds) {
            this.winner = this.firstArmy;
            return true
        }

        if (checkArmyLost(this.firstArmy)) {
            this.winner = this.secondArmy
            return true
        }

        if (checkArmyLost(this.secondArmy)) {
            this.winner = this.firstArmy
            return true
        }
        return false
    }

    checkRowFall() {
        const ROW_Y_CHECK = 1;
        const FALL_Y_CHECK = 0;

        function checkRow(army: Army) {
            return army.cells.some(row =>
                row[0].y === ROW_Y_CHECK && row.some(cell => cell.getCharacter())
            );
        }

        function rowFall(army: Army) {
            for (let row of army.cells) {
                if (row[0].y === FALL_Y_CHECK) {
                    for (let cell of row) {
                        if (cell.getCharacter()) {
                            const targetRow = army.cells.find(r => r[0].y === ROW_Y_CHECK && r.some(c => c.x === cell.x));
                            if (targetRow) {
                                const targetCell = targetRow.find(c => c.x === cell.x);
                                if (targetCell) {
                                    army.move(cell, targetCell);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!checkRow(this.firstArmy)) {
            rowFall(this.firstArmy)
        }

        if (!checkRow(this.secondArmy)) {
            rowFall(this.secondArmy)
        }
    }

    public getCopyBoard(): Board {
        return new Board(this.firstArmy, this.secondArmy, this.activeCell);
    }

}