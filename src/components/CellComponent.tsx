import React, {FC} from 'react';
import {Cell} from "../models/Cell";
import {CharacterHits} from "../models/characters/Character";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
    currentCharHits: number | null;

}
const CellComponent: FC<CellProps> = ({cell, selected, click, currentCharHits}) => {

    const charMissingHits = cell.character ? cell.character?.hits - cell.character?.currentHits : 0
    const dynamicHeight = charMissingHits > 0 && cell.character  ? (charMissingHits / cell.character?.hits) * 100 + "%" : "0%";
    const overlayStyle = {
        height: dynamicHeight,
        bottom: 0
    };

    return (
        <div className={[
            'cell',
            cell.cellType,
            selected ? "selected" : '',
            cell.available && cell.character ? "can-action" : '',
            cell.available && !cell.character ? "available" : '',
        ].join(' ')}
             onClick={() => click(cell)}
        >
            {/*{cell.character?.logo && <img src={cell.character.logo} className="image-with-overlay"/>}*/}
            {cell.character?.logo && (
                <div>
                    <div className="image-with-overlay" style={overlayStyle}></div>
                    <img src={cell.character.logo} alt="Character Logo" />
                </div>

            )}

        </div>
    );
};

export default CellComponent;

