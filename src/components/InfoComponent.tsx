import React, {FC} from 'react';
import logo from './../assets/persones/img_72.png'
import {Cell} from "../models/Cell";

interface InfoProps {
    hoveredCell: Cell | null;
}

const InfoComponent: FC<InfoProps> = ({hoveredCell}) => {
    const char = hoveredCell?.character
    return (
        <div className="info-component">
            {hoveredCell?.character
                ? <div><img src={char?.persona} alt="Character Logo"/>
                    <div className="info-stats">
                        <div className="info-name">
                            <span>
                                {char?.name}
                            </span>
                        </div>
                        <div className="info-text-sides">
                    <span>
                        Hits:
                    </span>
                            <span>
                        {char?.currentHits}
                    </span>
                        </div>
                        <div className="info-text-sides">
                    <span>
                        Melee defence:
                    </span>
                            <span>
                        {char?.defenceBlow}
                    </span>
                        </div>
                        <div className="info-text-sides">
                    <span>
                        Range defence:
                    </span>
                            <span>
                        {char?.defenceShot}
                    </span>
                        </div>
                        <div className="info-text-sides">
                    <span>
                        Attack:
                    </span>
                            <span>
                        {char?.attack}
                    </span>
                        </div>
                        <div className="info-text-sides">
                    <span>
                        Initiative:
                    </span>
                            <span>
                        {char?.currentInitiative}
                    </span>
                        </div>
                        <div className="info-text-sides">
                    <span>
                        Actions:
                    </span>
                            <span>
                        {char?.currentActions}
                    </span>
                        </div>
                    </div>
                </div>
                : ''
            }

        </div>
    );
};

export default InfoComponent;