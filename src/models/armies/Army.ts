import {Cell, CellType} from "../Cell";
import {PlayerType} from "../PlayerType";

// TODO: Put the constant in the config. Change initCells() in Army to use configuration values.
const armyStructure = {
    frontRow: [CellType.TENT, CellType.MELEE, CellType.MELEE, CellType.MELEE, CellType.MELEE, CellType.TENT],
    rangeRow: [CellType.TENT, CellType.RANGE, CellType.RANGE, CellType.RANGE, CellType.RANGE, CellType.TENT],
    rows: 2,
    cells: 6,
}
export class Army {
    cells: Cell[][] = [];

    initCells(playerType: PlayerType) {
        for (let i = 0; i < armyStructure.rows; i++) {
            const row: Cell[] = [];
            const cellRow = i === 0 ? armyStructure.frontRow : armyStructure.rangeRow;

            for (let j = 0; j < armyStructure.cells; j++) {
                row.push(new Cell(j, i, null, cellRow[j], playerType, this));
            }

            this.cells.push(row);
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]

                target.available = !!selectedCell?.character?.canMove(target)

                if (!target.available) {
                    target.available = !!selectedCell?.character?.canAttack(target)
                }

            }
        }
    }

    
}