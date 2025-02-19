import React, {useEffect, useState} from 'react';

import {Army, CharacterAssignment} from "../models/Army";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {createCharacter} from "../models/characters/CharacterCreation";
import {CharactersList} from "../models/characters/CharactersData";
import {PlayerType} from "../models/Player";
import CharacterWindowComponent from "./CharacterWindowComponent";
import BoardComponent from "./BoardComponent";
export interface Assignments {
    top: CharacterAssignment[];
    bottom: CharacterAssignment[];
}

const GameComponents = () => {
    const [board, setBoard] = useState<Board | null>(null)
    const [currentCell, setCurrentCell] = useState<Cell | null>(null)
    const [hoveredCell, setHoveredCell] = useState<Cell | null>(null)
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });


    useEffect(() => {
        const assignments: Assignments = {
            top: [
                { coordinate: { x: 1, y: 0 }, character: createCharacter(CharactersList.HERO_RANGER) },
                { coordinate: { x: 1, y: 1 }, character: createCharacter(CharactersList.KNIGHT) },
            ],
            bottom: [
                { coordinate: { x: 1, y: 1 }, character: createCharacter(CharactersList.HERO_ARCHMAGE) },
                { coordinate: { x: 2, y: 1 }, character: createCharacter(CharactersList.SAINT) },
                { coordinate: { x: 2, y: 0 }, character: createCharacter(CharactersList.KNIGHT) },
            ]
        };

        const initializeArmy = (playerType: PlayerType, assignments: CharacterAssignment[]) => {
            const army = new Army(playerType, '1');
            army.assignCharacters(assignments);
            return army;
        };

        const firstArmy = initializeArmy(PlayerType.FIRST, assignments.top);
        const secondArmy = initializeArmy(PlayerType.SECOND, assignments.bottom);

        const newBoard = new Board(firstArmy, secondArmy, null);
        console.log(newBoard)
        newBoard.start()
        setCurrentCell(newBoard.activeCell)
        setBoard(newBoard);
    }, []);

    // Temporary stuff

    const updateBoard = () => {
        if (!board) return
        board.searchInteractions()
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    const handleCoordinatesChange = (e: any) => {
        const { name, value } = e.target;
        setCoordinates((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className={"Game"}>
            {
             hoveredCell ? (<CharacterWindowComponent cell={hoveredCell}/>) :
             currentCell ? (<CharacterWindowComponent cell={currentCell}/>) :
             <div/>
            }

            {board ? (<BoardComponent board={board} setBoard={setBoard}
                                      currentCell={currentCell}
                                      setCurrentCell={setCurrentCell}
                // setWinner={setWinner}
                                      setHoveredCell={setHoveredCell}
            />) : (<div></div>)}

            {/*    </div>*/}
            {/*</div>*/}
            {/*{winner && (*/}
            {/*    <div className={`winner-message ${winner === PlayerType.FIRST ? 'player-1' : 'player-2'}`}>*/}
            {/*        Победил игрок {winner}! Поздравляем*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default GameComponents;