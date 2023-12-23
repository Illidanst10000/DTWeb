import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;

}
const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div className={[
            'cell',
            cell.cellType,
            selected ? "selected" : '',
            cell.available && cell.character ? "can-action" : '',
            cell.available && !cell.character ? "available" : ''
        ].join(' ')}
             onClick={() => click(cell)}
        >
            {cell.character?.logo && <img src={cell.character.logo}/>}
        </div>
    );
};

export default CellComponent;

