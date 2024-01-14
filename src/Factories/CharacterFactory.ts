import {PlayerType} from "../models/PlayerType";
import {Cell} from "../models/Cell";
import {Character} from "../models/characters/Character";
import {CharacterClasses} from "../models/characters/CharacterClasses";
import {CharactersData} from "../models/characters/СharactersData";
// "GlobalIndex": 1,
// 		"Name": "Рыцарь",
// 		"Descript": "Участник множества жестоких битв, Рыцарь обладает превосходным опытом ведения боя.",
// 		"Cost": 280,
// 		"CostMultipler": 100,
// 		"CostGoldDiv": 1,
// 		"Nature": "Loyal",
// 		"StartExpirience": 100,
// 		"LevelMultipler": 150,
// 		"IconIndex": 43,
// 		"Hits": 80,
// 		"AttackBlow": 45,
// 		"DefenceBlow": 15,
// 		"DefenceShot": 10,
// 		"ProtectLife": 15,
// 		"ProtectDeath": 15,
// 		"ProtectElemental": 15,
// 		"Initiative": 9,
// 		"Manevres": 1,
export class CharacterFactory {

    createCharacter(name: string): Character | null {

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