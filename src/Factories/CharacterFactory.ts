import {PlayerType} from "../models/PlayerType";
import {Cell} from "../models/Cell";
import {Character} from "../models/characters/Character";
import {CharacterClasses} from "../models/characters/CharacterClasses";
import {CharactersData} from "../models/characters/СharactersData";

export class CharacterFactory {
    createCharacter(name: string, playerType: PlayerType, cell: Cell): Character | null {

        const className = name as string;

        const CharacterClass = CharacterClasses[className];

        if (CharacterClass) {
            return new CharacterClass(playerType, cell);
        } else {
            console.error(`Unknown character name: ${name}`);
            return null;
        }
    }
}