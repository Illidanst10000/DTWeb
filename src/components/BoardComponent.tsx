import React, { FC, useEffect, useState, useRef } from 'react';
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import ArmyComponent from "./ArmyComponent";
import {AnimationProps, ProjectileAnimation, BloodSplashAnimation, BloodSplashAnimationProps} from "./Animations";
import {AttackType, Character} from "../models/characters/Character";
import {Army} from "../models/Army";


interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentCell: Cell | null;
    setCurrentCell: (character: Cell) => void;
    setHoveredCell: (cell: Cell) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentCell, setCurrentCell, setHoveredCell }) => {
    const [projectileAnimation, setProjectileAnimation] = useState<AnimationProps | null>(null);
    const [bloodSplashAnimation, setBloodSplashPosition] = useState<BloodSplashAnimationProps | null>(null);
    const boardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        highlightCells();
    }, [currentCell]);

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    const highlightCells = () => {
        board.searchInteractions();
        updateBoard();
    };

    const switchTurn = () => {
        if (board.checkWin()) {

        }
        const nextCell = board.searchNextActive();
        setCurrentCell(nextCell);
    };


    const handleMovementOrAttack = (currentCell: Cell, targetCell: Cell): void => {
        const army = board.getArmyById(currentCell.armyID);

        const currentChar = currentCell.character!;
        const targetChar = targetCell.character;

        if (army.canMove(currentCell, targetCell)) {
            handleMove(currentCell, targetCell, army);
        } else if (targetChar && currentChar.canAttack(targetChar)) {
            handleAttack(currentCell, targetCell, currentChar, targetChar);
        } else {
            handleNoOp(currentCell, targetCell, currentChar);
        }


    };

    const handleMove = (currentCell: Cell, targetCell: Cell, army: Army): void => {
        army.move(currentCell, targetCell);
        setCurrentCell(targetCell);
    };

    const handleAttack = (currentCell: Cell, targetCell: Cell, currentChar: Character, targetChar: Character): void => {
        const attackType = currentChar.attack(targetChar);
        currentChar.useMove();
        if (attackType) startProjectileAnimation(currentCell, targetCell, attackType);
    };

    const handleNoOp = (currentCell: Cell, targetCell: Cell, currentChar: Character): void => {
        if (currentCell === targetCell) currentChar.useMove();
    };

    const click = (targetCell: Cell): void => {
        try {
            if (currentCell && currentCell.character) {
                handleMovementOrAttack(currentCell, targetCell);
            }
            switchTurn();
            updateBoard();
        } catch (error) {
            console.error("Error handling cell click: ", error);
        }
    };

    const startProjectileAnimation = (sourceCell: Cell, targetCell: Cell, attackType: AttackType) => {
        const sourceArmy = board.getArmyById(sourceCell.armyID)
        const targetArmy = board.getArmyById(targetCell.armyID)
        const sourceElement = document.getElementById(
            `cell-${sourceCell.x}-${sourceCell.y}-army-${sourceArmy.playerType.toString()}`
        );

        const targetElement = document.getElementById(
            `cell-${targetCell.x}-${targetCell.y}-army-${targetArmy.playerType.toString()}`
        );

        if (sourceElement && targetElement) {
            const sourceRect = sourceElement.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            if (!boardRef.current) return;
            const containerRect = boardRef.current.getBoundingClientRect();

            setProjectileAnimation({
                sourceRect,
                targetRect,
                containerRect,
                attackType,
                onComplete: () => {
                    setProjectileAnimation(null);
                    setBloodSplashPosition({
                        position: {
                            x: targetRect.left - containerRect.left + targetRect.width / 2,
                            y: targetRect.top - containerRect.top + targetRect.height / 2,
                        },
                        attackType: attackType,
                        onComplete: () => {setBloodSplashPosition(null)}
                    });
                },
            });
        }
    };

    console.log(board.winner)

    return (
        <div className="board" ref={boardRef}>
            <ArmyComponent army={board.firstArmy} currentCell={currentCell} setHoveredCell={setHoveredCell} click={click} />
            <div className="separator"></div>
            <ArmyComponent army={board.secondArmy} currentCell={currentCell} setHoveredCell={setHoveredCell} click={click} />
            <div className="animation-container">
                {projectileAnimation && <ProjectileAnimation {...projectileAnimation} />}
                {bloodSplashAnimation && <BloodSplashAnimation {...bloodSplashAnimation}  />}
            </div>
        </div>
    );
};

export default BoardComponent;
