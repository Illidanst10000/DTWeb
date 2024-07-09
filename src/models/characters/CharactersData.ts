import knightLogo from '../../assets/icons/knight.png';
import archmageHeroLogo from '../../assets/icons/archmage_hero.png';

import knightPersona from '../../assets/persones/img_0.png'
import archmageHeroPersona from '../../assets/persones/archmage_hero.png'

import logo from '../../assets/melee.jpg'
import {CharType, MagicDirection, MagicType, MagicTypeWithDirection} from "./Character";
import {Bonuses} from "../bonuses/Bonus";

export enum CharactersList {
    KNIGHT = 1,
    HERO_ARCHMAGE = 2,
}

interface CharacterData {
    [key: string]: {
        GlobalIndex: number;
        Info: {
            Name: string;
            Description: string;
            Icon: typeof logo;
            Persona: typeof logo;
            CharacterType: CharType;
            MagicType: MagicTypeWithDirection;
        }
        Power: {
            Magic: number;
            Range: number;
            Melee: number;
        }
        Defence: {
            DeathMagic: number;
            ElementalMagic: number;
            LifeMagic: number;
            HandPercent: number;
            RangePercent: number;
            MagicUnits: number;
            MeleeUnits: number;
            RangeUnits: number;
        }
        Stats: {
            Hp: number;
            Moves: number;
            Initiative: number;
            Vampiring: number;
            Regeneration: number;
        }
        Bonus: Bonuses
    };
}

export const characters: CharacterData = {
    Knight: {
        GlobalIndex: 1,
        Info: {
            Name: "Knight",
            Description: "A brave warrior",
            Icon: knightLogo,
            Persona: knightPersona,
            CharacterType: CharType.People,
            MagicType: {
                type: MagicType.Basic,
                direction: MagicDirection.Basic
            }
        },
        Power: {
            Magic: 0,
            Range: 0,
            Melee: 25
        },
        Defence: {
            DeathMagic: 5,
            ElementalMagic: 10,
            LifeMagic: 20,
            HandPercent: 0,
            RangePercent: 0,
            MagicUnits: 0,
            MeleeUnits: 10,
            RangeUnits: 5
        },
        Stats: {
            Hp: 100,
            Moves: 1,
            Initiative: 20,
            Vampiring: 0,
            Regeneration: 0
        },
        Bonus: Bonuses.Basic
    },
    Archmage_Hero: {
        GlobalIndex: 2,
        Info: {
            Name: "Архимаг",
            Description: "Архимаг способен обращаться к могущественным силам мирозданья, неподвластным простым людям.",
            Icon: archmageHeroLogo,
            Persona: archmageHeroPersona,
            CharacterType: CharType.People,
            MagicType: {
                type: MagicType.Elemental,
                direction: MagicDirection.ToEnemy
            }
        },
        Power: {
            Magic: 25,
            Range: 0,
            Melee: 0
        },
        Defence: {
            DeathMagic: 35,
            ElementalMagic: 35,
            LifeMagic: 35,
            HandPercent: 0,
            RangePercent: 0,
            MagicUnits: 0,
            MeleeUnits: 0,
            RangeUnits: 0
        },
        Stats: {
            Hp: 50,
            Moves: 2,
            Initiative: 26,
            Vampiring: 0,
            Regeneration: 0
        },
        Bonus: Bonuses.Basic
    }

};