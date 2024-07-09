import React, {FC, useEffect, useState} from 'react';
import {Cell} from "../models/Cell";
import classNames from 'classnames';

interface CellProps {
    cell: Cell;
    currentCell: Cell;
    click: (cell: Cell) => void;
    onCellHover: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, currentCell, click, onCellHover}) => {
    const [selected, setSelected] = useState(false)
    const [height, setHeight] = useState(0)
    useEffect(() => {
        setSelected(
            cell.x === currentCell?.x &&
            cell.y === currentCell?.y &&
            cell.army === currentCell.army
        );

        if (currentCell.character) {
            const charMissingHits = currentCell.character.modified.maxHp - currentCell.character.modified.hp;
            // console.log('missing hits: ', Math.round((charMissingHits / currentCell.character.modified.hp)))

        }
    }, [currentCell, cell]);

    // const charMissingHits = cell.character ? cell.character.modified.maxHp - cell.character.modified.hp : 0;
    // let dynamicHeight = charMissingHits > 0 &&
    //     cell.character  ? (charMissingHits / cell.character?.modified.hp) * 100 + "%" : "0%";
    //
    const overlayStyle = {
        height: 0,
        bottom: 0
    };

    const cellClassNames = classNames(
        'cell',
        cell.cellType,
        { 'selected': selected },
        { 'can-action': cell.available && cell.character && cell.character !== currentCell.character },
        { 'available': cell.available && !cell.character }
    );

    return (
        <div className={cellClassNames}
             onClick={() => click(cell)}
             onMouseEnter={() => onCellHover(cell)}>
            {/*{cell.character?.info.icon && <img src={cell.character.info.icon} className="image-with-overlay"/>}*/}
            {cell.character?.info.icon && (
                <div>
                    <div className="image-with-overlay" style={overlayStyle}></div>
                    <img src={cell.character.info.icon} alt="Character Logo" />
                    {cell.x} {cell.y}
                </div>

            )}
        </div>


    );
};

export default CellComponent;

