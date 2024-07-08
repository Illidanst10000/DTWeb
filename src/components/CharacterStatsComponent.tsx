import React, {FC} from 'react';
import {Character} from "../models/characters/Character";

interface CharStatsProps {
    character: Character;
}
const CharacterStatsComponent: FC<CharStatsProps> = ({character}) => {
    return (
        <div className="character-stats">
            <div className="char-text-sides">
                <span>
                    {'A: ' + character.modified.damage.melee}
                </span>
                <span>
                    {'D: ' + character.modified.defence.meleeUnits  + '/' + character.modified.defence.rangeUnits}
                </span>
            </div>
            <div className="char-text-sides">
                <span>
                    {'Mnvr: ' + character.modified.moves}
                </span>
                <span>
                    {'Ini: ' + character.modified.initiative}
                </span>
            </div>
            <div className="char-text-center">
                {" Hits: "}
                {character.modified.maxHp !== character.modified.hp ? character.modified.hp + '/' : ''}
                { character.modified.maxHp }
            </div>
        </div>
    );
};

export default CharacterStatsComponent;