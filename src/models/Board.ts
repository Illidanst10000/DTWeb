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
import {PlayerType} from "./Player";
import {Cell} from "./Cell";

export const MaxRounds = 25;

export class Board {

    firstArmy: Army;
    secondArmy: Army;
    winner: Army | null;
    activeCell: Cell | null;
    roundsCount: number;

    constructor(firstArmy: Army, secondArmy: Army) {
        this.firstArmy = firstArmy
        this.secondArmy = secondArmy
        this.winner = null;
        this.activeCell = null;
        this.roundsCount = 0;
    }

    public start() {
        this.firstArmy.cells.forEach((cellRow) => {
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

        this.secondArmy.cells.forEach((cellRow) => {
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

        this.activeCell = this.searchNextActive()
    }

    searchNextActive(): Cell {
        // TODO: isWinner check
        function maxInitiative(cells: Cell[][]) {

            return cells.reduce((prevRow, currentRow, rowIndex) => {
                const maxInRow = currentRow.reduce((prev, current, colIndex) => {
                    const prevCell = prev.cell;
                    const currentCell = current;

                    if (isCellInactive(prevCell) ||
                        ((currentCell.character && prevCell.character) &&
                            currentCell.character.modified.initiative > prevCell.character.modified.initiative)) {
                        return { cell: currentCell, rowIndex, colIndex };
                    }

                    return prev;
                }, { cell: currentRow[0], rowIndex, colIndex: 0 });

                if ((maxInRow.cell.character && prevRow.cell.character) &&
                    maxInRow.cell.character.modified.initiative > prevRow.cell.character.modified.initiative) {
                    return maxInRow;
                }

                return prevRow;
            }, { cell: cells[0][0], rowIndex: 0, colIndex: 0 });

        }

        function isCellInactive(cell: Cell): boolean {
            if (!cell.character) {
                return true;
            }

            return cell.character.modified.moves < 1 || cell.character.isDead();
        }

        const firstArmyNext = maxInitiative(this.firstArmy.cells).cell;
        const secondArmyNext = maxInitiative(this.firstArmy.cells).cell;

        if (isCellInactive(firstArmyNext) ||
            ((secondArmyNext.character && firstArmyNext.character) &&
                secondArmyNext.character.modified.initiative > firstArmyNext.character.modified.initiative)) {
            return secondArmyNext;
        }

        return firstArmyNext;
    }
//     let army1 = gamemap.armys[battle.army1];
//     let army2 = gamemap.armys[battle.army2];
//     let canInteract = [];

//     if (battle.active_unit !== undefined) {
//     let activeArmy = battle.active_unit[0];
//
//     let [tr1, tr2] = [army1.troops, army2.troops];
//     let [troops1, troops2] = [tr1, tr2];
//
//     let activeTroops = (activeArmy === battle.army1) ? troops1 : troops2;
//
//     function collectInteractions(activeUnit, activeTroops, troops, army, canInteract) {
//         canInteract.push(
//             ...troops
//                 .map((troop, i) => {
//                     if (i === activeUnit[1] && activeUnit[0] === army) {
//                         return null;
//                     }
//
//                     let troopObj = troop.get();
//                     let index = troopObj.pos;
//                     let unit = troopObj.unit;
//                     let activeTroop = activeTroops[activeUnit[1]].get();
//                     let activeUnitUnit = activeTroop.unit;
//
//                     if (activeUnitUnit.canAttack(unit, troopObj.pos, activeTroop.pos)) {
//                         return [0, index];
//                     } else {
//                         return null;
//                     }
//                 })
//                 .filter(Boolean)
//         );
//     }
//
//     collectInteractions(battle.active_unit, activeTroops, troops1, battle.army1, canInteract);
//     collectInteractions(battle.active_unit, activeTroops, troops2, battle.army2, canInteract);
//
//     return canInteract.length > 0 ? canInteract : null;
// }
//
// return null;

    //      1) есть ли активный юнит
    // 2) сравниваем активного юнита с обеими армиями на can attack
    // 3) сравниваем активного юнита с обеими армиями на can move
    // 4) если да, то для каждого подтверждения устанавливаем available для cell
    searchInteractions(): void {
        if (!this.activeCell || !this.activeCell.character) {
            return;
        }
        const activeChar = this.activeCell.character
        function checkAndMarkAvailability (cell: Cell): void {
            if (cell.character && activeChar.canAttack(cell.character)) {
                cell.available = true;
            } else {
                //TODO: canMove func() require
                cell.available = false;
            }
            return
        }

        this.firstArmy.cells.forEach(cellRow1 => {
            cellRow1.forEach(cell => checkAndMarkAvailability(cell));
        });

        this.secondArmy.cells.forEach(cellRow2 => {
            cellRow2.forEach(cell => checkAndMarkAvailability(cell));
        });
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
        return new Board(this.firstArmy, this.secondArmy);
    }

    public addCharacters() {
        const damage = new CharPower(0, 0, 45)
        const defence = new CharDefence(15, 15, 15, 0, 0, 0, 15, 10)
        const magicTypeWithDirection: MagicTypeWithDirection = {type: MagicType.Basic, direction: MagicDirection.Basic};
        const info = new CharInfo('Knight', 'desc', null, null, CharType.People, magicTypeWithDirection)
        const stats = new CharStats(80, 80, damage, defence, 1, 1, 9, 0, 0)
        const inventory = CharInventory.empty()
        const army = new Army(PlayerType.FIRST);
        const charPos = CharPos.empty();
        new Character(stats, info, inventory, army, Bonuses.Basic, [], charPos)
    }
}