import {Player} from "./Player";
import {JSX} from "react";

export class PlayerManager {
    list: Player[];


    private currentIndex: number;
    get current(): Player {
        return this.list[this.currentIndex];
    }

    constructor(players: Player[]) {
        this.list = players;
        this.currentIndex = 0;
    }


    _getData() : string[][] {
        return this.list.map((player) => player._getData());
    }

    addPlayer(player: Player) {
        this.list[this.list.length] = player;
    }

    nextPlayer() {
        this.currentIndex ++;
        this.currentIndex %= this.list.length;
    }
}