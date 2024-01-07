import {Board} from "./Board";
import {Rules} from "./Rules/Rules";
import {PieceManager} from "./Piece/PieceManager";
import {PlayerManager} from "./Player/PlayerManager";
import {Settings} from "./Settings";
import {RenderManager} from "./RenderManager";


export class Game {


    static ins: Game;

    board : Board;
    rules : Rules;

    pieces: PieceManager;
    players: PlayerManager;
    get currentPlayer() {
        return this.players.current;
    }

    settings: Settings;
    renderManager: RenderManager;


    constructor(rules: Rules) {
        this.rules = rules;

        this.players = new PlayerManager(this,2)
        console.error("new Player");

        this.pieces = new PieceManager(this)
        this.pieces.clearStatics();
        this.pieces.addStatics(rules.initPieces(this));
        this.board = this.rules.initBoard(this);

        this.settings = new Settings();
        this.renderManager = new RenderManager(this);

        Game.ins = this;
    }

}