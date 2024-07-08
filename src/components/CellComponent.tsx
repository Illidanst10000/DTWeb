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

    useEffect(() => {
        setSelected(
            cell.x === currentCell?.x &&
            cell.y === currentCell?.y &&
            cell.army === currentCell.army
        );
    }, [currentCell, cell]);

    const charMissingHits = cell.character ? cell.character.stats.maxHp - cell.character.stats.hp : 0;
    const dynamicHeight = charMissingHits > 0 &&
        cell.character  ? (charMissingHits / cell.character?.stats.hp) * 100 + "%" : "0%";

    const overlayStyle = {
        height: dynamicHeight,
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

            {cell.character?.info.icon && <img src={cell.character.info.icon} className="image-with-overlay"/>}
        </div>


    );
};

export default CellComponent;

