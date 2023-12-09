import {Board} from "./Board";
import {Rules} from "./Rules";
import {PieceManager} from "./PieceManager";
import {PlayerManager} from "./PlayerManager";
import {Shogi} from "./Shogi";
import {Player} from "./Player";


export const PieceTypes = [1,2,3];


export class Game {

    static ins: Game;

    board : Board;
    rules : Rules;

    pieces: PieceManager;
    players: PlayerManager = new PlayerManager();

    currentPlayer: Player;

    constructor(rules: Rules) {
        this.rules = rules;


        this.players.list[0] = new Player(1);
        this.players.list[1] = new Player(-1);
        console.error("new Player");

        this.currentPlayer = this.players.list[0];

        this.pieces = new PieceManager(this)
        this.pieces.clearStatics();
        this.pieces.addStatics(rules.initPieces(this));
        this.board = this.rules.initBoard(this);

        Game.ins = this;
    }

    //当前玩家完成操作, 切换玩家
    switchPlayer() {

    }

}