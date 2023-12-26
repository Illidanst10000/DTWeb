import React, {FC, useEffect, useState} from 'react';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Character} from "../models/characters/Character";
import AttackTurnService from "../services/AttackTurnService";
import CharacterStatsComponent from "./CharacterStatsComponent";
import underCellLogo from "./../assets/undercell.png"
import {PlayerType} from "../models/PlayerType";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentCharacter: Character | null
    setCurrentCharacter: (character: Character) => void
    setWinner: (playerType: PlayerType) => void
    setHoveredCell: (cell: Cell) => void

}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentCharacter,
                                            setCurrentCharacter, setWinner, setHoveredCell}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)


    useEffect(() => {
        setSelectedCell(currentCharacter?.cell ?? null)
    }, [currentCharacter])

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function click(cell: Cell) {

        if (selectedCell && selectedCell.character) {

            if (selectedCell.character.canMove(cell)) {
                AttackTurnService.move(selectedCell, cell);
                setSelectedCell(cell);

            } else if (selectedCell === cell) {
                AttackTurnService.skip(selectedCell);

            } else if (selectedCell.character.canAttack(cell)) {
                const updatedTargetHits = AttackTurnService.attack(selectedCell, cell);

                if (updatedTargetHits === 0) {
                    cell.removeCharacter();
                    if (board.handleWinner()) {
                        board.handleWinner() === PlayerType.FIRST
                            ? setWinner(PlayerType.FIRST)
                            : setWinner(PlayerType.SECOND)
                    }
                    highlightCells();
                }
            }
            switchTurn()
            updateBoard();
        }
    }

    function handleCellHover(cell: Cell) {
        setHoveredCell(cell);
    }
    function switchTurn() {
        const nextChar = board.getNextChar();
        setCurrentCharacter(nextChar);
    }

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
                                onCellHover={handleCellHover}
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

