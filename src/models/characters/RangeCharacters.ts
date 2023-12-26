import {Character, RangeCharacter} from "./Character";
import {PlayerType} from "../PlayerType";
import {Cell} from "../Cell";
import {CharactersData} from "./СharactersData";

export class Assassin extends Character implements RangeCharacter{
    constructor(playerType: PlayerType, cell: Cell) {
        super(playerType, cell);

        this.name = CharactersData.Assassin.Name;
        this.logo = CharactersData.Assassin.IconIndex
        this.persona = CharactersData.Assassin.Persona
        this.description = CharactersData.Assassin.Descript
        this.defenceShot = CharactersData.Assassin.DefenceShot
        this.protectLife = CharactersData.Assassin.ProtectLife
        this.protectDeath = CharactersData.Assassin.ProtectDeath
        this.protectElemental = CharactersData.Assassin.ProtectElemental

        this.hits = CharactersData.Assassin.Hits
        this.currentHits = CharactersData.Assassin.Hits

        this.initiative = CharactersData.Assassin.Initiative
        this.currentInitiative = CharactersData.Assassin.Initiative

        this.actions = CharactersData.Assassin.Manevres
        this.currentActions = CharactersData.Assassin.Manevres

        this.attack = CharactersData.Assassin.AttackShot

    }

}