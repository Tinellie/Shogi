import {Player} from "./Player";
import {Game} from "../Game";

export class PlayerManager {

    readonly game: Game;
    list: Player[];


    private currentIndex: number;
    get current(): Player {
        return this.list[this.currentIndex];
    }

    constructor(game: Game, playersNo: number) {
        this.game = game;
        this.list = [];
        for (let i = 0; i < playersNo; i++){
            this.list.push(new Player(i, (i % 2 === 0) ? 1: -1))

        }
        this.currentIndex = 0;
    }


    _getData() : string[][] {
        return this.list.map((player) => player._getData());
    }

    addPlayer(player: Player) {
        this.list.push(player);
    }

    nextPlayer() {
        if (this.game.settings.dontSwitchPlayer) return;
        this.currentIndex ++;
        this.currentIndex %= this.list.length;
    }
}