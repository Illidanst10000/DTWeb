import React, {FC, useEffect, useState} from 'react';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import CharacterStatsComponent from "./CharacterStatsComponent";
import underCellLogo from "./../assets/undercell.png"
import {Army} from "../models/Army";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentCell: Cell | null
    setCurrentCell: (character: Cell) => void
    // setWinner: (playerType: PlayerType) => void
    setHoveredCell: (cell: Cell) => void

}

const BoardComponent: FC<BoardProps> = (
    {   board,
        setBoard,
        currentCell,
        setCurrentCell,
        setHoveredCell}) => {

    useEffect(() => {
        // console.log('Selected cell state update: ', currentCell)
        highlightCells()

    }, [currentCell]);

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    function highlightCells() {
        // console.log('highlight cells | board.activeCell: ', board.activeCell)
        board.searchInteractions()
        updateBoard()
    }

    function handleCellHover(cell: Cell) {
        setHoveredCell(cell);
    }

    function switchTurn() {
        // console.log('switchTurn | board.activeCell: ', board.activeCell)
        const nextCell = board.searchNextActive();
        setCurrentCell(nextCell);
    }

    function click(targetCell: Cell) {
        if (currentCell && currentCell.character) {
            const army = currentCell.army;
            const currentChar = currentCell.character;
            const targetChar = targetCell.character

            if (army.canMove(currentCell, targetCell)) {
                army.move(currentCell, targetCell);
                setCurrentCell(targetCell)
            } else if (targetChar && currentCell.character.canAttack(targetChar)) {
                currentChar.attack(targetChar)
                currentChar.useMove()
            } else if (currentCell === targetCell) {
                currentChar.useMove()
            }
        }
        switchTurn();
        updateBoard();
    }

    function renderArmy(army: Army) {
        return army.cells.map((row, index) => (
            <React.Fragment key={index}>
                {row.map((cell, index) => (
                    <div className="cell-component" key={index}>
                        {currentCell ? <CellComponent
                            click={click}
                            cell={cell}
                            currentCell={currentCell}
                            onCellHover={handleCellHover}
                        /> : <div/>}

                        {cell.character
                            ? <CharacterStatsComponent character={cell.character}/>
                            : <img className="under-cell" src={underCellLogo} alt={"undercell"}/>}
                    </div>
                ))}
            </React.Fragment>
        ));
    }


    return (
        <div className="board">
            <div className="army">{renderArmy(board.firstArmy)}</div>
            <div className="separator"></div>
            <div className="army">{renderArmy(board.secondArmy)}</div>
        </div>
    );
};

export default BoardComponent;

