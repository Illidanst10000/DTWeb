import {Character, MageCharacter} from "./Character";
import {PlayerType} from "../PlayerType";
import {Cell} from "../Cell";
import ShadowLogo from "../../assets/icons/shadow.png";
import {CharactersData} from "./СharactersData";

export class Shadow extends Character implements MageCharacter{
    magicType: string;
    magicDirection: string;

    constructor(playerType: PlayerType, cell: Cell) {
        super(playerType, cell);

        this.name = CharactersData.Shadow.Name;
        this.logo = CharactersData.Shadow.IconIndex
        this.description = CharactersData.Shadow.Descript
        this.protectLife = CharactersData.Shadow.ProtectLife
        this.protectDeath = CharactersData.Shadow.ProtectDeath
        this.protectElemental = CharactersData.Shadow.ProtectElemental
        this.initiative = CharactersData.Shadow.Initiative
        this.hits = CharactersData.Shadow.Hits
        this.actions = CharactersData.Shadow.Manevres

        this.magicType = CharactersData.Shadow.Magic
        this.magicDirection = CharactersData.Shadow.MagicDirection

        this.attack = CharactersData.Shadow.MagicPower

    }
}