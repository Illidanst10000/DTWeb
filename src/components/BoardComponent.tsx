import React, {FC, useEffect, useState} from 'react';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Character} from "../models/characters/Character";
import AttackTurnService from "../services/AttackTurnService";
import CharacterStatsComponent from "./CharacterStatsComponent";
import underCellLogo from "./../assets/undercell.png"

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);

    function initCurrentChar() {
        const initialCharacter = board.getInitChar()
        setCurrentCharacter(initialCharacter);
    }
    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.character?.canMove(cell)) {
            selectedCell.moveCharacter(cell)
            setSelectedCell(null)
        } else {
            setSelectedCell(cell)
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }


    return (
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <div className="cell-component">
                            <CellComponent
                                click={click}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                            {cell.character
                                ? <CharacterStatsComponent char={cell.character}/>
                                : <img className="under-cell" src={underCellLogo}/>}
                        </div>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardComponent;

// массив персонажей отсортирован. берем массив, самый большой по инициативе чар устанавливается как текущий чар и выделяется.
// когда чар походит и его маневры = 0 он удаляется из массива, при обновлении массива вызывается по юзэфекту функция смены чара на следующего.
// когда чары в массиве заканчиваются берем новый массив текущих персонажей и прогоняем по кругу.

// массив персонажей получаем при первом появлении доски и при пустом массиве персонажей
//
// useEffect(() => {
//     if (currentCharacter && currentCharacter.actions === 0) {
//         const currentIndex = allChars.indexOf(currentCharacter);
//         const nextCharacter = allChars[currentIndex + 1] || allChars[0];
//         setCurrentCharacter(nextCharacter);
//     }
// }, [currentCharacter, allChars]);
