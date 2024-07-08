// берем список всех персонажей на доске.
// сортируем массив по значению инициативы
// берем первого персонажа из массива
// передаем ему ход
// логика хода
// когда ход закончен (кол-во действий = 0) персонаж удаляется из массива, а его инициатива приравнивается к нулю
// когда в массиве не остается персонажей все начинается с начала пока у одной из сторон не закончатся персонажи

import {Cell} from "../models/Cell";
import {Character} from "../models/characters/Character";

export default class AttackTurnService {
    //
    // public static handleCharTurn(char: Character) {
    //     if (char.currentActions === 1) {
    //         char.currentInitiative = 0;
    //     }
    //     if (char.currentActions > 0) {
    //         char.useAction()
    //     }
    // }
    // public static attack(cell: Cell, targetCell: Cell): number {
    //     if (cell.character && targetCell.character) {
    //         const charAttack = cell.character.getCharAttack()
    //         const targetCharHits = targetCell.character.getCurrentHits()
    //         const updatedHits = targetCharHits - charAttack
    //         this.handleCharTurn(cell.character)
    //         if (updatedHits > 0) {
    //             targetCell.character.setCurrentHits(updatedHits)
    //             return updatedHits
    //         }
    //         return 0;
    //     }
    //     throw new Error("Invalid state - both cells must have characters to perform an attack.");
    // }
    //
    // public static move(cell: Cell, targetCell: Cell): void {
    //
    //     if (cell.character && cell.character.canMove(targetCell)) {
    //         this.handleCharTurn(cell.character)
    //         const charActions = cell.character.currentActions
    //         cell.character.moveCharacter(targetCell)
    //         targetCell.setCharacter(cell.character)
    //         cell.character = null;
    //
    //     }
    //
    // }
    //
    // public static skip(cell: Cell): void {
    //     if (cell.character) {
    //         this.handleCharTurn(cell.character)
    //     }
    // }





}