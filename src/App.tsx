import React, {useEffect, useState} from 'react';
import BoardComponent from "./components/BoardComponent";
import "./App.css"
import {Board} from "./models/Board";
import {Army} from "./models/Army";
import {Cell} from "./models/Cell";
import {PlayerType} from "./models/Player";
import {createCharacter} from "./models/characters/CharacterCreation";
import {CharactersList} from "./models/characters/CharactersData";

const App = () => {
    const [board, setBoard] = useState<Board | null>(null)
    const [currentCell, setCurrentCell] = useState<Cell | null>(null)
    const [hoveredCell, setHoveredCell] = useState<Cell | null>(null)
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    // const [winner, setWinner] = useState<PlayerType | null> (null)

    const [topArmy, setTopArmy] = useState<Army>(new Army(PlayerType.FIRST))
    const [bottomArmy, setBottomArmy] = useState<Army>(new Army(PlayerType.SECOND))

    useEffect(() => {
        const assignmentsTop = [
            { coordinate: { x: 1, y: 1 }, character: createCharacter(CharactersList.KNIGHT) },
        ];
        const assignmentsBottom = [
            { coordinate: { x: 1, y: 0 }, character: createCharacter(CharactersList.HERO_ARCHMAGE) },
            { coordinate: { x: 3, y: 0 }, character: createCharacter(CharactersList.KNIGHT) },
        ];
        const firstArmy = new Army(PlayerType.FIRST)
        const secondArmy = new Army(PlayerType.SECOND)

        firstArmy.assignCharacters(assignmentsTop);
        secondArmy.assignCharacters(assignmentsBottom);

        setTopArmy(firstArmy)
        setBottomArmy(secondArmy)
        const newBoard = new Board(firstArmy, secondArmy, null);
        newBoard.start()
        setCurrentCell(newBoard.activeCell)
        setBoard(newBoard);
    }, []);

    useEffect(() => {
        console.log('Board activeCell: ', board?.activeCell)
    }, [board]);


    // useEffect(() => {
    //     console.log('CurrentCharacter update state', currentCharacter)
    // }, [currentCharacter]);


    // Temporary stuff

    function updateBoard() {
        if (!board) return
        board.searchInteractions()
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    const handleCoordinatesChange = (e: any) => {
        const { name, value } = e.target;
        setCoordinates((prev) => ({ ...prev, [name]: value }));
    };

    const addCharToTop = () => {
        const coords = { x: coordinates.x, y: coordinates.y };

        const assignments = [
            { coordinate: coords, character: createCharacter(CharactersList.KNIGHT) },
        ];
        topArmy.assignCharacters(assignments);
        updateBoard()
    };

    const addCharToBottom = () => {
        const coords = { x: coordinates.x, y: coordinates.y };

        const assignments = [
            { coordinate: coords, character: createCharacter(CharactersList.KNIGHT) },
        ];
        bottomArmy.assignCharacters(assignments);
        updateBoard()
    };
    return (

        <div className="App">


            {board ? (<BoardComponent board={board} setBoard={setBoard}
                                      currentCell={currentCell}
                                      setCurrentCell={setCurrentCell}
                // setWinner={setWinner}
                                      setHoveredCell={setHoveredCell}
            />) : (<div></div>)}

            <div className="actions-block">

                <div className="coordinates-input-block">
                    <label>X Coordinates:</label>
                    <input
                        type="number"
                        name="x"
                        value={coordinates.x}
                        onChange={handleCoordinatesChange}
                        placeholder="X"
                    />
                    <label>Y Coordinates:</label>
                    <input
                        type="number"
                        name="y"
                        value={coordinates.y}
                        onChange={handleCoordinatesChange}
                        placeholder="Y"
                    />
                </div>
                <div className="buttons-block">
                    <div className="add-character-button" onClick={addCharToTop}>
                        CLICK TO ADD TO TOP
                    </div>
                    <div className="add-character-button" onClick={addCharToBottom}>
                        CLICK TO ADD TO BOTTOM
                    </div>

                </div>
            </div>
            {/*{winner && (*/}
            {/*    <div className={`winner-message ${winner === PlayerType.FIRST ? 'player-1' : 'player-2'}`}>*/}
            {/*        Победил игрок {winner}! Поздравляем*/}
            {/*    </div>*/}
            {/*)}*/}


        </div>
    );
};

export default App;