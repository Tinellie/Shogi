import {Player} from "./Player";

export class PlayerManager {
    list: Player[] = [];

    addPlayer(player: Player) {
        this.list[this.list.length] = player;
    }
}