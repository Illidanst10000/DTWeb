import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CharWindowProps {
    cell: Cell;
}

const CharacterWindowComponent: FC<CharWindowProps> = ({cell}) => {
    return (
        <div className={"char-window"}>
            {cell.x} {cell.y}
            {cell.character ?
                (<div className={"char-window-block"}>
                    <img className={"char-window-persona"} src={cell.character.info.persona} alt="Character Logo"/>
                    <div className="char-window-info">
                        <div className="char-name-title">
                            {cell.character.info.name}
                        </div>
                        <div className="char-info-stats">
                            <div className="char-info-stats-block">
                                <div className="char-stat">
                                    HP:
                                </div>

                                <div className="char-stat">
                                    {cell.character.modified.damage.melee ? "Melee damage: " :
                                        cell.character.modified.damage.range ? "Range damage:" :
                                            cell.character.modified.damage.magic ? "Power: " : ""}
                                </div>

                                <div className="char-stat">
                                    Initiative:
                                </div>

                                <div className="char-stat">
                                    Moves:
                                </div>
                            </div>

                            <div className="char-info-stats-block">
                                <div className="char-stat">
                                    {cell.character.modified.hp}
                                </div>
                                <div className="char-stat">
                                    {cell.character.modified.damage.melee ? cell.character.modified.damage.melee :
                                        cell.character.modified.damage.range ? cell.character.modified.damage.range :
                                            cell.character.modified.damage.magic ? cell.character.modified.damage.magic : ""}
                                </div>

                                <div className="char-stat">
                                    {cell.character.modified.initiative}
                                </div>

                                <div className="char-stat">
                                    {cell.character.modified.moves}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) :
                (<div/>)
            }
        </div>
    );
};

export default CharacterWindowComponent