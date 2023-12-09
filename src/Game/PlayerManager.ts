import {Player} from "./Player";
import {JSX} from "react";

export class PlayerManager {
    list: Player[] = [];

    _getData() : string[][] {
        return this.list.map((player) => player._getData());
    }

    addPlayer(player: Player) {
        this.list[this.list.length] = player;
    }
}