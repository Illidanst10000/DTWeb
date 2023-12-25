import {Character, MageCharacter} from "./Character";
import {PlayerType} from "../PlayerType";
import {Cell} from "../Cell";
import {CharactersData} from "./СharactersData";

export class Bishop extends Character implements MageCharacter {
    magicType: string;
    magicDirection: string;
    constructor(playerType: PlayerType, cell: Cell) {
        super(playerType, cell);

        this.name = CharactersData.Bishop.Name;
        this.logo = CharactersData.Bishop.IconIndex
        this.description = CharactersData.Bishop.Descript
        this.protectLife = CharactersData.Bishop.ProtectLife
        this.protectDeath = CharactersData.Bishop.ProtectDeath
        this.protectElemental = CharactersData.Bishop.ProtectElemental
        this.initiative = CharactersData.Bishop.Initiative
        this.hits = CharactersData.Bishop.Hits
        this.currentHits = CharactersData.Bishop.Hits
        this.actions = CharactersData.Bishop.Manevres

        this.magicType = CharactersData.Bishop.Magic
        this.magicDirection = CharactersData.Bishop.MagicDirection
        this.attack = CharactersData.Bishop.MagicPower

    }

}


