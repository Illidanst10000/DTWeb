import {
    Character,
    CharDefence,
    CharInfo,
    CharInventory, CharPos,
    CharPower,
    CharStats,
    CharType,
    MagicDirection,
    MagicType,
    MagicTypeWithDirection
} from "./characters/Character";
import {Army} from "./Army";
import {Bonus, Bonuses} from "./bonuses/Bonus";
import {Cell} from "./Cell";

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
                    char.recalc();
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
        if (!this.firstArmy.cells.length || !this.secondArmy.cells.length) {
            throw new Error("Invalid army cells");
        }

        const firstArmyNext = this.findMaxInitiativeCell(this.firstArmy.cells).cell;
        const secondArmyNext = this.findMaxInitiativeCell(this.secondArmy.cells).cell;

        if (this.isCellInactive(firstArmyNext) || this.getCellInitiative(secondArmyNext) > this.getCellInitiative(firstArmyNext)) {
            this.activeCell = secondArmyNext;
            return this.activeCell
        }

        this.activeCell = firstArmyNext;
        return this.activeCell
    }

    private processArmyCells(army: Army, activeCell: Cell): void {
        army.cells.forEach(cellRow => {
            cellRow.forEach(cell => this.checkAndMarkAvailability(activeCell, cell));
        });
    }

    searchInteractions(): void {
        if (!this.activeCell || !this.activeCell.character) {
            console.log('Inactive cell or character', this.activeCell);
            return;
        }

        // console.log('Searching interactions for active cell');
        this.processArmyCells(this.firstArmy, this.activeCell);
        this.processArmyCells(this.secondArmy, this.activeCell);
    }

    private checkAndMarkAvailability(activeCell: Cell, targetCell: Cell): void {
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
                    char?.tick();
                    char.stats.moves = char.modified.maxMoves;
                    char.recalc();
                }
            }
        }
    }

    nextTurnRound() {
        this.restoreMoves(this.firstArmy.cells)
        this.restoreMoves(this.secondArmy.cells)

        this.roundsCount += 1;
        this.checkWin();
    }

    checkWin(): void {
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
        }

        if (checkArmyLost(this.firstArmy)) {
            this.winner = this.secondArmy
        }

        if (checkArmyLost(this.secondArmy)) {
            this.winner = this.firstArmy
        }
    }

    checkRowFall() {
        function checkRow(army: Army) {

            return true;
        }

        function rowFall(army: Army) {

        }

        if (checkRow(this.firstArmy)) {
            rowFall(this.firstArmy)
        }

        if (checkRow(this.secondArmy)) {
            rowFall(this.secondArmy)
        }
    }

    public getCopyBoard(): Board {
        return new Board(this.firstArmy, this.secondArmy, this.activeCell);
    }

    public addCharacters() {
        const damage = new CharPower(0, 0, 45)
        const defence = new CharDefence(15, 15, 15, 0, 0, 0, 15, 10)
        const magicTypeWithDirection: MagicTypeWithDirection = {type: MagicType.Basic, direction: MagicDirection.Basic};
        const info = new CharInfo('Knight', 'desc', null, null, CharType.People, magicTypeWithDirection)
        const stats = new CharStats(80, 80, damage, defence, 1, 1, 9, 0, 0)
        const inventory = CharInventory.empty()
        const charPos = CharPos.empty();
        new Character(stats, info, inventory, Bonuses.Basic, [], charPos)
    }
}