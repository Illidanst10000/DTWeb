// берем список всех персонажей на доске.
// сортируем массив по значению инициативы
// берем первого персонажа из массива
// передаем ему ход
// логика хода
// когда ход закончен (кол-во действий = 0) персонаж удаляется из массива, а его инициатива приравнивается к нулю
// когда в массиве не остается персонажей все начинается с начала пока у одной из сторон не закончатся персонажи

import {Character} from "../models/characters/Character";
import {Board} from "../models/Board";

export default class AttackTurnService {

    public static sortCharsByInitiative(chars: Character[]) {
       return chars.sort((a, b) => b.initiative - a.initiative);
    }

    public static getSortedCharacters(board: Board) {
        const allChars = board.getAllCharacters()
        return allChars.sort((a, b) => b.initiative - a.initiative);

    }

    public static deleteCharFromQueue(char: Character, sortedChars: Character[]) {
        const index = sortedChars.indexOf(char)
        if (index !== -1) {
            sortedChars.splice(index, 1);
        }
        return sortedChars;
    }


}