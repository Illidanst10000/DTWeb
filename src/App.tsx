import React, {StrictMode, useEffect, useState} from 'react';
import BoardComponent from "./components/BoardComponent";
import "./App.css"
import {Board} from "./models/Board";
import {Character, CharacterHits} from "./models/characters/Character";


const App = () => {
    const [board, setBoard] = useState(new Board())
    const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
    const [charsCurrentHits, setCharsCurrentHits] = useState<CharacterHits[] | null>(null)

    useEffect(() => {
        restart()

    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        setCurrentCharacter(newBoard.addCharacters())
        initCharsCurrentHits()
        setBoard(newBoard)
    }

    function initCharsCurrentHits() {
        const chars: Character[] = board.getAllCharacters()
        const charsHits: CharacterHits[] = [];

        chars.forEach((char) => {
            const characterHits: CharacterHits = {
                name: char.name,
                currentHits: char.hits,
            };
            charsHits.push(characterHits);
        })

        setCharsCurrentHits(charsHits)
    }

    return (

        <div className="App">
            <BoardComponent board={board} setBoard={setBoard}
                            currentCharacter={currentCharacter}
                            setCurrentCharacter={setCurrentCharacter}
                            charsCurrentHits={charsCurrentHits}
                            setCharsCurrentHits={setCharsCurrentHits}
            />
        </div>
    );
};

export default App;