import {Character, MageCharacter} from "./Character";
import {PlayerType} from "../PlayerType";
import {Cell} from "../Cell";
import LichLogo from "../../assets/icons/lich.png";
import {CharactersData} from "./СharactersData";

export class Lich extends Character implements MageCharacter{
    magicType: string;
    magicDirection: string;

    constructor(playerType: PlayerType, cell: Cell) {
        super(playerType, cell);

        this.name = CharactersData.Lich.Name;
        this.logo = CharactersData.Lich.IconIndex
        this.description = CharactersData.Lich.Descript
        this.protectLife = CharactersData.Lich.ProtectLife
        this.protectDeath = CharactersData.Lich.ProtectDeath
        this.protectElemental = CharactersData.Lich.ProtectElemental
        this.initiative = CharactersData.Lich.Initiative
        this.hits = CharactersData.Lich.Hits
        this.actions = CharactersData.Lich.Manevres

        this.magicType = CharactersData.Lich.Magic
        this.magicDirection = CharactersData.Lich.MagicDirection
        this.attack = CharactersData.Lich.MagicPower

    }
}