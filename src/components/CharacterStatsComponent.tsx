import React, {FC} from 'react';
import {Cell} from "../models/Cell";
import {Character} from "../models/characters/Character";

interface CharStatsProps {
    char: Character;
}
const CharacterStatsComponent: FC<CharStatsProps> = ({char}) => {
    return (
        <div className="character-stats">
            <div className="char-text-sides">
                <span>
                    {'A: ' + char.attack}
                </span>
                <span>
                    {'D: ' + char.defenceBlow + '/' + char.defenceShot}
                </span>
            </div>
            <div className="char-text-sides">
                <span>
                    {'Mnvr: ' + char.actions}
                </span>
                <span>
                    {'Ini: ' + char.initiative}
                </span>
            </div>
            <div className="char-text-center">
                {'Hits: ' + char.hits}
            </div>
        </div>
    );
};

export default CharacterStatsComponent;