import React, {FC, useEffect, useState} from 'react';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Character, CharacterHits} from "../models/characters/Character";
import AttackTurnService from "../services/AttackTurnService";
import CharacterStatsComponent from "./CharacterStatsComponent";
import underCellLogo from "./../assets/undercell.png"

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentCharacter: Character | null
    setCurrentCharacter: (character: Character) => void
    charsCurrentHits: CharacterHits[] | null
    setCharsCurrentHits: (characterHits: CharacterHits[]) => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentCharacter, setCurrentCharacter,
                                        charsCurrentHits, setCharsCurrentHits }) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    useEffect(() => {
        setSelectedCell(currentCharacter?.cell ?? null)
    }, [currentCharacter])

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.character?.canAttack(cell)) {
            const updatedTargetHits = AttackTurnService.attack(selectedCell, cell)
            const charsHits = (charsCurrentHits ?? []).map((char) => {
                if (char.name === updatedTargetHits.name) {
                    return {
                        ...char,
                        currentHits: updatedTargetHits.currentHits
                    };
                } else {
                    return char
                }
            })
            setCharsCurrentHits(charsHits)
        }
        else if (selectedCell && selectedCell !== cell && selectedCell.character?.canMove(cell)) {
            selectedCell.moveCharacter(cell)
            setSelectedCell(null)
        } else {
            setSelectedCell(cell)
        } // delete this
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
                                currentCharHits={
                                    cell.character && charsCurrentHits
                                        ? charsCurrentHits.find(char => char.name === cell.character?.name)?.currentHits || null
                                        : null
                                }
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

