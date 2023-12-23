import {Cell} from "./Cell";
import {CellType} from "./CellType";
import {PlayerType} from "./PlayerType";
import {CharacterFactory} from "../Factories/CharacterFactory";
import {Character} from "./characters/Character";
import {CharactersData} from "./characters/СharactersData";

export class Board {

    cells: Cell[][] = []

    private characterFactory: CharacterFactory = new CharacterFactory();
    public initCells() {
        for (let i = 0; i < 4; i++) {
            const row: Cell[] = []
            const playerType = i < 2 ? PlayerType.FIRST : PlayerType.SECOND;
            for (let j = 0; j < 6; j++) {
                if (j === 0 || j === 5) {
                    row.push(new Cell(j, i,null, CellType.TENT, playerType, this))
                    continue;
                }
                if (i === 0 || i === 3) {
                    row.push(new Cell(j, i,null, CellType.RANGE, playerType, this))
                } else {
                    row.push(new Cell(j, i,null, CellType.MELEE, playerType, this))
                }}


            this.cells.push(row)
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.character?.canMove(target)
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells
        return newBoard
    }

    getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    getAllCharacters(): Character[] {
        const allCharacters: Character[] = [];

        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.character) {
                    allCharacters.push(cell.character);
                }
            });
        });
        return allCharacters.sort((a, b) => b.initiative - a.initiative);
    }

    getInitChar(): Character {
        const chars = this.getAllCharacters()
        return chars[0]
    }

    public addCharacters() {
        this.characterFactory.createCharacter(CharactersData.Knight.Name, PlayerType.FIRST, this.getCell(3,1))
        this.characterFactory.createCharacter(CharactersData.Assassin.Name, PlayerType.FIRST, this.getCell(2,1))
        this.characterFactory.createCharacter(CharactersData.Shadow.Name, PlayerType.FIRST, this.getCell(2,0))
        this.characterFactory.createCharacter(CharactersData.Lich.Name, PlayerType.SECOND, this.getCell(3,2))
        this.characterFactory.createCharacter(CharactersData.Bishop.Name, PlayerType.SECOND, this.getCell(3,3))

    }
}