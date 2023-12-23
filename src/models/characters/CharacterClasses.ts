import {PlayerType} from "../PlayerType";
import {Cell} from "../Cell";
import {Character} from "./Character";
import {Knight} from "./MeleeCharacterClasses";
import {Bishop} from "./ElementalMageCharacters";
import {Assassin} from "./RangeCharacters";
import {Lich} from "./NecroMageCharacters";
import {Shadow} from "./NatureMageCharacters";
import {CharactersData} from "./СharactersData";

export const CharacterClasses: Record<string, new (playerType: PlayerType, cell: Cell) => Character> = {
    [CharactersData.Knight.Name]: Knight,
    [CharactersData.Bishop.Name]: Bishop,
    [CharactersData.Assassin.Name]: Assassin,
    [CharactersData.Lich.Name]: Lich,
    [CharactersData.Shadow.Name]: Shadow,
};