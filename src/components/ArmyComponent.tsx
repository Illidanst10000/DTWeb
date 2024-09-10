import React, { FC } from 'react';
import CellComponent from "./CellComponent";
import CharacterStatsComponent from "./CharacterStatsComponent";
import { Army } from "../models/Army";
import { Cell } from "../models/Cell";
import underCellLogo from "./../assets/undercell.png";

interface ArmyProps {
    army: Army;
    currentCell: Cell | null;
    setHoveredCell: (cell: Cell) => void;
    click: (targetCell: Cell) => void;
}

const ArmyComponent: FC<ArmyProps> = ({ army, currentCell, setHoveredCell, click }) => {
    return (
        <>
            {army.cells.map((row, rowIndex) => (
                <div className="cell-row" key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div className="cell-component" key={cellIndex}>
                            {currentCell ? (
                                <CellComponent
                                    click={click}
                                    cell={cell}
                                    currentCell={currentCell}
                                    setHoveredCell={setHoveredCell}
                                />
                            ) : (
                                <div />
                            )}
                            {cell.character ? (
                                <CharacterStatsComponent character={cell.character} />
                            ) : (
                                <img className="under-cell" src={underCellLogo} alt="undercell" />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default ArmyComponent;
