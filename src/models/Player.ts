import {PlayerType} from "./PlayerType";

export class Player {
    playerType: PlayerType;

    constructor(playerType: PlayerType) {
        this.playerType = playerType;
    }
}