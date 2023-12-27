import {Character, MagicType} from "../characters/Character";
import {Modify, ModifyCharStats} from "../characters/CharactersStats";

export enum EffectKind {
    MageCurse,
    MageSupport,
    Bonus,
    Item,
    Potion,
    Poison,
}

interface Effect {
    updateStats(char: Character): void;
    onTick(): boolean;
    onBattleEnd?(): boolean;
    tick?(char: Character): boolean;
    finish(char: Character): void;
    isFinished(): boolean;
    getKind?(): EffectKind;
}

interface EffectInfo {
    lifetime: number;
    magicPower?: number;
    magicType?: MagicType;
}

class MoreMoves implements Effect, EffectInfo {
    lifetime: number;
    constructor() {
        this.lifetime = 1;
    }

    updateStats(char: Character): void {
        char.modify.maxMoves.add(1)
        char.modify.moves.add(1)
    }

    onTick(): boolean {
        this.lifetime -= 1;
        return false;
    }

    isFinished(): boolean {
        return !this.lifetime;
    }

    finish(char: Character): void {
        char.modify.maxMoves.add(-1)
        char.modify.moves.add(-1)
    }
}

export class HealMagic implements Effect, EffectInfo {
    lifetime: number;
    magicPower: number;
    constructor(magicPower: number) {
        this.lifetime = 1
        this.magicPower = magicPower
    }

    updateStats(char: Character): void {
        const damage = char.stats.damage
        const damageAdd = this.magicPower / 5
        const defenceAdd = this.magicPower / 10

        if (damage.melee) {
            char.modify.damage.melee.add(damageAdd)
        }
        if (damage.range) {
            char.modify.damage.range.add(damageAdd)
        }

        char.modify.defence.meleeUnits.add(defenceAdd)
        char.modify.defence.rangeUnits.add(defenceAdd)
    }

    onTick(): boolean {
        this.lifetime -= 1;
        return false;
    }

    finish(char: Character): void {
        const damage = char.stats.damage
        const damageAdd = this.magicPower / 5
        const defenceAdd = this.magicPower / 10
        const modify = new ModifyCharStats();
        if (damage.melee) {
            char.modify.damage.melee.add(damageAdd)
        }
        if (damage.range) {
            char.modify.damage.range.add(damageAdd)
        }

        char.modify.defence.meleeUnits.add(defenceAdd)
        char.modify.defence.rangeUnits.add(defenceAdd)
    }

    getKind(): EffectKind {
        return undefined;
    }

    isFinished(): boolean {
        return false;
    }

    onBattleEnd(): boolean {
        return false;
    }



    tick(char: Character): boolean {
        return false;
    }



}


