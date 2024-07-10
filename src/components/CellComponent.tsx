import React, {FC, useEffect, useState} from 'react';
import {Cell} from "../models/Cell";
import classNames from 'classnames';

interface CellProps {
    cell: Cell;
    currentCell: Cell;
    click: (cell: Cell) => void;
    setHoveredCell: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, currentCell, click, setHoveredCell}) => {
    const [selected, setSelected] = useState(false)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setSelected(
            cell.x === currentCell?.x &&
            cell.y === currentCell?.y &&
            cell.army === currentCell.army
        );
    }, [currentCell, cell]);

    const missingHpPercent = cell.character
        ? ((cell.character.modified.maxHp - cell.character.modified.hp) / cell.character.modified.maxHp) * 100
        : 0;

    const overlayStyle = {
        height: missingHpPercent,
        bottom: 0
    };

    const onCellHover = (cell: Cell) => {
        if (cell.character) {
            setHoveredCell(cell)
        }
    }

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
             onMouseEnter={() => onCellHover(cell)}
        >
            {/*{cell.character?.info.icon && <img src={cell.character.info.icon} className="image-with-overlay"/>}*/}
            {cell.character?.info.icon && (
                <div>
                    <div className="image-with-overlay" style={overlayStyle}></div>
                    <img src={cell.character.info.icon} alt="Character Logo" />
                </div>

            )}
        </div>


    );
};

export default CellComponent;

