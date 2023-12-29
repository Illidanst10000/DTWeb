import {calcPerc} from "../../utils";
import {CharDefence, CharPower, CharStats} from "./Character";


export class Modify {

    setV: number | null;
    addV: number | null;
    percentAddV: number | null;
    percentSetV: number | null;
    constructor() {
        this.setV = null;
        this.addV = null;
        this.percentAddV = null;
        this.percentSetV = null;
    }

    apply(v: number): number {
        let value = v + (this.addV || 0);
        if (this.percentAddV) {
            value += calcPerc(value, this.percentAddV)
        }
        if (this.percentSetV) {
            value = calcPerc(value, this.percentSetV)
        }
        if (this.setV && this.setV !== 0) {
            value = this.setV;
        }
        return value;
    }

    set(v: number): Modify {
        this.setV = v;
        return this
    }

    add(v: number): Modify {
        this.addV = v;
        return this
    }

    percentAdd(v: number): Modify {
        this.percentAddV = v;
        return this
    }

    percentSet(v: number): Modify {
        this.percentSetV = v;
        return this
    }

    updateValues(otherModify: Modify): void {
        if (otherModify.addV !== null) {
            this.addV = this.addV
                ? this.addV + otherModify.addV
                : otherModify.addV;
        }
        if (otherModify.setV !== null) {
            this.setV = this.setV
                ? this.setV + otherModify.setV
                : otherModify.setV;
        }

        if (otherModify.percentAddV !== null) {
            this.percentAddV = this.percentAddV
                ? this.percentAddV + otherModify.percentAddV
                : otherModify.percentAddV;
        }

        if (otherModify.percentSetV !== null) {
            this.percentSetV = this.percentSetV
                ? this.percentSetV + otherModify.percentSetV
                : otherModify.percentSetV;
        }
    }
}

export class ModifyDefence {
    deathMagic: Modify;
    elementalMagic: Modify;
    lifeMagic: Modify;
    handPercent: Modify;
    rangePercent: Modify;
    magicUnits: Modify;
    meleeUnits: Modify;
    rangeUnits: Modify;

    constructor() {
        this.deathMagic = new Modify();
        this.elementalMagic = new Modify();
        this.lifeMagic = new Modify();
        this.handPercent = new Modify();
        this.rangePercent = new Modify();
        this.magicUnits = new Modify();
        this.meleeUnits = new Modify();
        this.rangeUnits = new Modify();
    }

    apply(defence: CharDefence): CharDefence {
        const nDefence = CharDefence.empty();
        nDefence.deathMagic = this.deathMagic.apply(defence.deathMagic);
        nDefence.elementalMagic = this.elementalMagic.apply(defence.elementalMagic);
        nDefence.lifeMagic = this.lifeMagic.apply(defence.lifeMagic);
        nDefence.meleePercent = this.handPercent.apply(defence.meleePercent);
        nDefence.rangePercent = this.rangePercent.apply(defence.rangePercent);
        nDefence.magicUnits = this.magicUnits.apply(defence.magicUnits);
        nDefence.rangeUnits = this.rangeUnits.apply(defence.rangeUnits);
        nDefence.meleeUnits = this.meleeUnits.apply(defence.meleeUnits);
        return nDefence;
    }

    updateValues(otherModify: ModifyDefence): void {
        this.deathMagic.updateValues(otherModify.deathMagic)
        this.elementalMagic.updateValues(otherModify.elementalMagic)
        this.lifeMagic.updateValues(otherModify.lifeMagic)
        this.handPercent.updateValues(otherModify.handPercent)
        this.rangePercent.updateValues(otherModify.rangePercent)
        this.magicUnits.updateValues(otherModify.magicUnits)
        this.meleeUnits.updateValues(otherModify.meleeUnits)
        this.rangeUnits.updateValues(otherModify.rangeUnits)
    }
}

export class ModifyPower {
    magic: Modify;
    range: Modify;
    melee: Modify;

    constructor() {
        this.magic = new Modify();
        this.range = new Modify();
        this.melee = new Modify();
    }

    apply(power: CharPower): CharPower {
        const nPower = CharPower.empty();
        nPower.magic = this.magic.apply(power.magic);
        nPower.range = this.range.apply(power.range);
        nPower.melee = this.melee.apply(power.melee);
        return nPower;
    }

    updateValues(otherModifyPower: ModifyPower): void {
        this.magic.updateValues(otherModifyPower.magic)
        this.range.updateValues(otherModifyPower.range)
        this.melee.updateValues(otherModifyPower.melee)
    }
}
export class ModifyCharStats {
    hp: Modify;
    maxHp: Modify;
    damage: ModifyPower;
    defence: ModifyDefence;
    moves: Modify;
    maxMoves: Modify;
    speed: Modify;
    vamp: Modify;
    regen: Modify;
    constructor() {
        this.hp = new Modify();
        this.maxHp = new Modify();
        this.damage = new ModifyPower();
        this.defence = new ModifyDefence();
        this.moves = new Modify();
        this.maxMoves = new Modify();
        this.speed = new Modify();
        this.vamp = new Modify();
        this.regen = new Modify();
    }

    apply(stats: CharStats): CharStats {
        const nStats = CharStats.empty();
        nStats.hp = this.hp.apply(stats.hp);
        nStats.maxHp = this.maxHp.apply(stats.maxHp);
        nStats.damage = this.damage.apply(stats.damage);
        nStats.defence = this.defence.apply(stats.defence);
        nStats.moves = this.moves.apply(stats.moves);
        nStats.maxMoves = this.maxMoves.apply(stats.maxMoves);
        nStats.initiative = this.speed.apply(stats.initiative);
        nStats.vamp = this.vamp.apply(stats.vamp);
        nStats.regen = this.regen.apply(stats.regen);
        return nStats;
    }

    updateValues(otherModifyCharStats: ModifyCharStats): void {
        this.hp.updateValues(otherModifyCharStats.hp);
        this.maxHp.updateValues(otherModifyCharStats.maxHp);
        this.damage.updateValues(otherModifyCharStats.damage);
        this.defence.updateValues(otherModifyCharStats.defence);
        this.moves.updateValues(otherModifyCharStats.moves);
        this.maxMoves.updateValues(otherModifyCharStats.maxMoves);
        this.speed.updateValues(otherModifyCharStats.speed);
        this.vamp.updateValues(otherModifyCharStats.vamp);
        this.regen.updateValues(otherModifyCharStats.regen);
    }
}