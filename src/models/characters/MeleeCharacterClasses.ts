import {PlayerType} from "../PlayerType";
import {Cell} from "../Cell";
import {Character, MeleeCharacter} from "./Character";
import {CharactersData} from "./СharactersData";

export class Knight extends Character implements MeleeCharacter {

    constructor(playerType: PlayerType, cell: Cell) {
        super(playerType, cell);

        this.name = CharactersData.Knight.Name;
        this.logo = CharactersData.Knight.IconIndex
        this.description = CharactersData.Knight.Descript
        this.defenceBlow = CharactersData.Knight.DefenceBlow
        this.attack = CharactersData.Knight.AttackBlow;
        this.defenceShot = CharactersData.Knight.DefenceShot
        this.protectLife = CharactersData.Knight.ProtectLife
        this.protectDeath = CharactersData.Knight.ProtectDeath
        this.protectElemental = CharactersData.Knight.ProtectElemental
        this.initiative = CharactersData.Knight.Initiative
        this.hits = CharactersData.Knight.Hits
        this.currentHits = CharactersData.Knight.Hits
        this.actions = CharactersData.Knight.Manevres

    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        return true
    }
}