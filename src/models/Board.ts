import {Cell} from "./Cell";
import {CellType} from "./Cell";
import {PlayerType} from "./PlayerType";
import {CharacterFactory} from "../Factories/CharacterFactory";
import {Character} from "./characters/Character";
import {CharactersData} from "./characters/СharactersData";
import {Army} from "./armies/Army";


export class Board {

    armies: Army[]

    constructor(armies: Army[]) {
        this.armies = armies
    }

        // private characterFactory: CharacterFactory = new CharacterFactory();

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells
        return newBoard
    }


    public fieldType(index: number) {
        if (index === 0 | index === ())
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

        return allCharacters.sort((a, b) => b.currentInitiative - a.currentInitiative);
    }

    resetCharsBasicStats() {
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.character) {
                    cell.character.resetStats()
                }
            });
        });
    }

    getNextChar(): Character {
        const chars = this.getAllCharacters()
        if (chars.every(char => char.currentInitiative === 0)) {
            this.resetCharsBasicStats()
            this.getNextChar()
        }
        return chars[0]
    }

    handleWinner(): string | false {
        const chars = this.getAllCharacters()

        const hasTypeFirst = chars.some(char => char.playerType === PlayerType.FIRST);
        const hasTypeSecond = chars.some(char => char.playerType === PlayerType.SECOND);

        if (!hasTypeFirst) {
            return PlayerType.SECOND;
        }
        if (!hasTypeSecond) {
            return PlayerType.FIRST;
        }

        return false;
    }

    public addCharacters() {
        this.characterFactory.createCharacter(CharactersData.Knight.Name, PlayerType.FIRST, this.getCell(3,1))
        this.characterFactory.createCharacter(CharactersData.Assassin.Name, PlayerType.FIRST, this.getCell(2,1))
        // this.characterFactory.createCharacter(CharactersData.Shadow.Name, PlayerType.FIRST, this.getCell(2,0))
        this.characterFactory.createCharacter(CharactersData.Lich.Name, PlayerType.SECOND, this.getCell(3,2))
        // this.characterFactory.createCharacter(CharactersData.Bishop.Name, PlayerType.SECOND, this.getCell(3,3))
        return this.getNextChar()
    }
}