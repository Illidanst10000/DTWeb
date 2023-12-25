// берем список всех персонажей на доске.
// сортируем массив по значению инициативы
// берем первого персонажа из массива
// передаем ему ход
// логика хода
// когда ход закончен (кол-во действий = 0) персонаж удаляется из массива, а его инициатива приравнивается к нулю
// когда в массиве не остается персонажей все начинается с начала пока у одной из сторон не закончатся персонажи

import {CharacterHits} from "../models/characters/Character";
import {Cell} from "../models/Cell";

export default class AttackTurnService {

    public static attack(cell: Cell, targetCell: Cell): CharacterHits {
        if (cell.character && targetCell.character) {
            const charAttack = cell.character.getCharAttack()
            const targetCharHits = cell.character.getCharHits()
            const targetName = targetCell.character.name
            targetCell.character.setCurrentHits(targetCharHits - charAttack)
            return {name: targetName, currentHits: (targetCharHits - charAttack)}
        }
        throw new Error("Invalid state - both cells must have characters to perform an attack.");
    }




}