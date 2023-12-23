import {Character, RangeCharacter} from "./Character";
import {PlayerType} from "../PlayerType";
import {Cell} from "../Cell";
import AssassinLogo from "../../assets/icons/assassin.png";
import {CharactersData} from "./СharactersData";

export class Assassin extends Character implements RangeCharacter{
    constructor(playerType: PlayerType, cell: Cell) {
        super(playerType, cell);

        this.name = CharactersData.Assassin.Name;
        this.logo = CharactersData.Assassin.IconIndex
        this.description = CharactersData.Assassin.Descript
        this.defenceShot = CharactersData.Assassin.DefenceShot
        this.protectLife = CharactersData.Assassin.ProtectLife
        this.protectDeath = CharactersData.Assassin.ProtectDeath
        this.protectElemental = CharactersData.Assassin.ProtectElemental
        this.initiative = CharactersData.Assassin.Initiative
        this.actions = CharactersData.Assassin.Manevres
        this.hits = CharactersData.Assassin.Hits

        this.attack = CharactersData.Assassin.AttackShot

    }

}