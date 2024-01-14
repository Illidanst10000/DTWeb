import React, {useEffect, useState} from 'react';
import BoardComponent from "./components/BoardComponent";
import "./App.css"
import {Board} from "./models/Board";
import {Character} from "./models/characters/Character";
import {PlayerType} from "./models/PlayerType";
import InfoComponent from "./components/InfoComponent";
import {Cell} from "./models/Cell";


const App = () => {
    // const [board, setBoard] = useState(new Board())
    // const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
    // const [hoveredCell, setHoveredCell] = useState<Cell | null>(null)
    // const [winner, setWinner] = useState<PlayerType | null> (null)
    //
    // useEffect(() => {
    //     restart()
    // }, [])
    //
    // function restart() {
    //     const newBoard = new Board();
    //     newBoard.initCells()
    //     setCurrentCharacter(newBoard.addCharacters())
    //     setBoard(newBoard)
    // }

    return (

        <div className="App">
            <InfoComponent hoveredCell={hoveredCell}/>
            <BoardComponent board={board} setBoard={setBoard}
                            currentCharacter={currentCharacter}
                            setCurrentCharacter={setCurrentCharacter}
                            setWinner={setWinner}
                            setHoveredCell={setHoveredCell}
            />
            {winner && (
                <div className={`winner-message ${winner === PlayerType.FIRST ? 'player-1' : 'player-2'}`}>
                    Победил игрок {winner}! Поздравляем
                </div>
            )}


        </div>
    );
};

export default App;