import {Character, CharDefence, CharInfo, CharInventory, CharPos, CharPower, CharStats} from "./Character";
import {characters} from "./CharactersData";

function findCharacterByGlobalIndex(globalIndex: number) {
    for (const key in characters) {
        if (characters[key].GlobalIndex === globalIndex) {
            return characters[key];
        }
    }
    return null;
}

export function createCharacter(index: number) {
    const data = findCharacterByGlobalIndex(index)

    if (!data) {
        throw new Error("Character data not found!");
    }
    const charInfo = new CharInfo(
        data.Info.Name,
        data.Info.Description,
        data.Info.Icon,
        data.Info.Persona,
        data.Info.CharacterType,
        data.Info.MagicType)

    const charPower = new CharPower(
        data.Power.Magic,
        data.Power.Range,
        data.Power.Melee)

    const charDefence = new CharDefence(
        data.Defence.DeathMagic,
        data.Defence.ElementalMagic,
        data.Defence.LifeMagic,
        data.Defence.HandPercent,
        data.Defence.RangePercent,
        data.Defence.MagicUnits,
        data.Defence.MeleeUnits,
        data.Defence.RangeUnits)

    const charStats = new CharStats(
        data.Stats.Hp,
        data.Stats.Hp,
        charPower,
        charDefence,
        data.Stats.Moves,
        data.Stats.Moves,
        data.Stats.Initiative,
        data.Stats.Initiative,
        data.Stats.Vampiring,
        data.Stats.Regeneration
    )

    const char = new Character(
        charStats,
        charInfo,
        CharInventory.empty(),
        data.Bonus,
        [],
        CharPos.empty()
    )
    return char;
}