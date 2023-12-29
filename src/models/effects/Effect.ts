import {Character, MagicType} from "../characters/Character";
import {Modify} from "../characters/CharactersStats";
import {calcPerc} from "../../utils";

export enum EffectKind {
    MageCurse,
    MageSupport,
    Bonus,
    Item,
    Potion,
    Poison,
}

export interface Effect {
    updateStats(char: Character): void;
    onTick?(): boolean;
    onBattleEnd?(): boolean;
    tick?(char: Character): boolean;
    finish?(char: Character): void;
    isFinished(): boolean;
    getKind?(): EffectKind;
}

interface EffectInfo {
    lifetime: number;
    magicPower?: number;
    magicType?: MagicType;
}

export class MoreMoves implements Effect, EffectInfo {
    lifetime: number;
    constructor() {
        this.lifetime = 1;
    }

    updateStats(char: Character): void {
        char.modify.maxMoves.updateValues(new Modify().add(1))
        char.modify.moves.updateValues(new Modify().add(1))
    }

    onTick(): boolean {
        this.lifetime -= 1;
        return true;
    }

    isFinished(): boolean {
        return !this.lifetime;
    }

    finish(char: Character): void {
        char.modify.maxMoves.updateValues(new Modify().add(-1))
        char.modify.moves.updateValues(new Modify().add(-1))
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
        const damageAdd = Math.round(this.magicPower / 5);
        const defenceAdd = Math.round(this.magicPower / 10);

        if (damage.melee) {
            char.modify.damage.melee.updateValues(new Modify().add(damageAdd))
        }
        if (damage.range) {
            char.modify.damage.range.updateValues(new Modify().add(damageAdd))
        }

        char.modify.defence.meleeUnits.updateValues(new Modify().add(defenceAdd))
        char.modify.defence.rangeUnits.updateValues(new Modify().add(defenceAdd))
    }

    finish(char: Character): void {
        const damage = char.stats.damage
        const damageAdd = Math.round(this.magicPower / 5);
        const defenceAdd = Math.round(this.magicPower / 10);

        if (damage.melee) {
            char.modify.damage.melee.updateValues(new Modify().add(-damageAdd))
        }
        if (damage.range) {
            char.modify.damage.range.updateValues(new Modify().add(-damageAdd))
        }

        char.modify.defence.meleeUnits.updateValues(new Modify().add(-defenceAdd))
        char.modify.defence.rangeUnits.updateValues(new Modify().add(-defenceAdd))
    }

    onTick(): boolean {
        this.lifetime -= 1;
        return true;
    }

    isFinished(): boolean {
        return !this.lifetime;
    }

    getKind(): EffectKind {
        return EffectKind.MageSupport
    }

}

export class DisableMagic implements Effect, EffectInfo {
    lifetime: number;
    magicPower: number;

    constructor(magicPower: number) {
        this.lifetime = 1;
        this.magicPower = magicPower;
    }

    updateStats(char: Character): void {
        if (this.magicPower < 20) {
            return
        }

        const addMoves = Math.round(1 + (this.magicPower / 50));

        char.modify.maxMoves.updateValues(new Modify().add(-addMoves))
        char.modify.moves.updateValues(new Modify().add(-addMoves))
    }

    finish(char: Character): void {
        if (this.magicPower < 20) {
            return
        }

        const addMoves = Math.round(1 + (this.magicPower / 50));

        char.modify.maxMoves.updateValues(new Modify().add(addMoves))
        char.modify.moves.updateValues(new Modify().add(addMoves))
    }

    getKind(): EffectKind {
        return EffectKind.MageCurse;
    }

    isFinished(): boolean {
        return !this.lifetime;
    }

    onBattleEnd(): boolean {
        this.lifetime = 0;
        return true;
    }

    onTick(): boolean {
        this.lifetime -= 1;
        return true;
    }
}

export class ElementalSupport implements Effect, EffectInfo {
    lifetime: number;
    magicPower: number;

    constructor(magicPower: number) {
        this.lifetime = 1;
        this.magicPower = magicPower;
    }

    updateStats(char: Character): void {
        if (this.magicPower < 20) {
            return
        }

        const addMoves = Math.round(1 + (this.magicPower / 50));

        char.modify.maxMoves.updateValues(new Modify().add(addMoves))
        char.modify.moves.updateValues(new Modify().add(addMoves))
    }
    finish(char: Character): void {
        if (this.magicPower < 20) {
            return
        }

        const addMoves = Math.round(1 + (this.magicPower / 50));

        char.modify.maxMoves.updateValues(new Modify().add(-addMoves))
        char.modify.moves.updateValues(new Modify().add(-addMoves))
    }

    getKind(): EffectKind {
        return EffectKind.MageSupport;
    }

    isFinished(): boolean {
        return !this.lifetime;
    }

    onBattleEnd(): boolean {
        this.lifetime = 0;
        return true;
    }

    onTick(): boolean {
        this.lifetime -= 1;
        return true;
    }
}

export class AttackMagic implements Effect, EffectInfo {
    lifetime: number;
    magicPower: number;

    constructor(magicPower: number) {
        this.lifetime = 1;
        this.magicPower = magicPower;
    }

    updateStats(char: Character): void {
        const damage = char.stats.damage;
        const defence = char.stats.defence;
        const damageAdd = Math.round(1 + (this.magicPower / 10));
        const defenceAdd = Math.round(1 + (this.magicPower / 5));

        if (damage.melee) {
            char.modify.damage.melee.updateValues(new Modify().add(-damageAdd))
        }
        if (damage.range) {
            char.modify.damage.range.updateValues(new Modify().add(-damageAdd))
        }
        if (defence.meleeUnits) {
            char.modify.defence.meleeUnits.updateValues(new Modify().add(-defenceAdd))
        }
        if (defence.rangeUnits) {
            char.modify.defence.rangeUnits.updateValues(new Modify().add(-defenceAdd))
        }
    }
    finish(char: Character): void {
        const damage = char.stats.damage;
        const defence = char.stats.defence;
        const damageAdd = Math.round(1 + (this.magicPower / 10));
        const defenceAdd = Math.round(1 + (this.magicPower / 5));

        if (damage.melee) {
            char.modify.damage.melee.updateValues(new Modify().add(damageAdd))
        }
        if (damage.range) {
            char.modify.damage.range.updateValues(new Modify().add(damageAdd))
        }
        if (defence.meleeUnits) {
            char.modify.defence.meleeUnits.updateValues(new Modify().add(defenceAdd))
        }
        if (defence.rangeUnits) {
            char.modify.defence.rangeUnits.updateValues(new Modify().add(defenceAdd))
        }
    }

    getKind(): EffectKind {
        return EffectKind.MageCurse;
    }

    isFinished(): boolean {
        return !this.lifetime;
    }

    onBattleEnd(): boolean {
        this.lifetime = 0;
        return true;
    }

    onTick(): boolean {
        this.lifetime -= 1;
        return true;
    }
}

export class Poison implements Effect, EffectInfo {
    lifetime: number;
    poisonPercent: number;
    constructor() {
        this.lifetime = -1;
        this.poisonPercent = 15;
    }

    updateStats(char: Character): void {
        const damage = calcPerc(char.stats.hp, this.poisonPercent)
        char.stats.hp -= damage
    }

    getKind(): EffectKind {
        return EffectKind.Poison;
    }

    isFinished(): boolean {
        return !this.lifetime;
    }

    onBattleEnd(): boolean {
        this.lifetime = 0;
        return true;
    }
}
