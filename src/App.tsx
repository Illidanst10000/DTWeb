import React, {StrictMode, useEffect, useState} from 'react';
import BoardComponent from "./components/BoardComponent";
import "./App.css"
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {PlayerType} from "./models/PlayerType";
import {Character} from "./models/characters/Character";
import AttackTurnService from "./services/AttackTurnService";

const App = () => {
    const [board, setBoard] = useState(new Board())

    useEffect(() => {
        restart()
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addCharacters()
        setBoard(newBoard)
    }


    return (

        <div className="App">
            <BoardComponent board={board} setBoard={setBoard}/>
        </div>
    );
};

export default App;