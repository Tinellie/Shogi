import {Player} from "../Player/Player";
import {Board} from "../Board";
import {Game} from "../Game";
import {Pos} from "../Pos";
import {PieceStatic} from "./PieceStatic";


export class Piece {

    private game: Game;


    static: PieceStatic;
    promoted: boolean = false;


    get name(): string { return this.static.name; }
    get symbol(): string { return this.static.symbol ?? this.name[0]; }
    //识别名, 即坐标加名字第一个字符
    get id(): string {
        return this.onBoard ?
            this.game.rules.styledIndex(this._pos.x, this._pos.y) + this.name[0] :
            this.name;
    }



    private _board: Board | null;
    get board(): Board {
        if (this._board === null) throw new Error(`trying to Get Board of Piece ${this}, but it's not on Board (Piece._board == null)`)
        return this._board;
    }
    set board(board: Board) {
        this._board = board;
    }
    public get onBoard(): boolean { return this.board !== null; }



    private _pos: Pos;
    public get pos(): Pos {
        if (!this.onBoard) {
            throw new Error(`Piece ${this} is not on Board, but try to get pos`);
        }
        if (this.board.gridP(this._pos).piece !== this){
            throw new Error(`Piece ${this} is located at ${this.board.getPos(this)}, but Piece._pos == ${this._pos}`);
        }

        return this._pos;
    }
    public set pos(pos: Pos) {
        if (this.board.gridP(pos).piece !== this){
            throw new Error(`Piece ${this} is located at ${this.board.getPos(this)}, but try to set pos to ${pos}`);
        }
        this._pos = pos;
    }
    absX = (rX: number) => this.pos.x + rX ;//* this.player.direction;
    absY = (rY: number) => this.pos.y + rY * this._player.direction;
    rX = (absX: number) => absX - this.pos.x;//* this.player.direction;
    rY = (absY: number) => (absY - this.pos.y) / this._player.direction;//* this.player.direction;




    constructor(game: Game, board: Board, type: PieceStatic, owner: Player) {
        this.game = game;
        this._board = board;

        this._player = owner;
        owner.addPiece(this);

        this.static = type;

        this._pos = new Pos(0,0);
    }
    toString(): string {
        return `${this.id}`;
    }




    belongTo = (player: Player) => player === this._player;
    //以 **相对坐标** 获取指定格子上的棋子
    getPiece: GetPieceFunc = (relX: number, relY: number) => {
        return this.board.grid(this.absX(relX), this.absY(relY)).piece;
    }


    //以相对坐标指定一个格子，返回 bool 值表示是否可以行走
    isWalkable (rx: number, ry: number): boolean  {
        return this.static.isWalkable(
            rx, ry,
            this.getPiece,
            (p: Piece | null): boolean => p?._player === this._player
        );
    }
    isWalkableAbs (absX: number, absY: number): boolean {
        return this.isWalkable(this.rX(absX), this.rY(absY));
    }

    //逐个格子遍历, 获取能行走的棋子
    getWalkableGrids(boardSize: Pos): Pos[] {
        let walkableGrids: Pos[] = [];

        for(let x: number = 0; x < boardSize.x; x++) {
            for(let y: number = 0; y < boardSize.y; y++) {
                //console.log(`isWalkable (${x},${y}) => (${this.rX(x)},${this.rY(y)}) = ${this.isWalkable(this.rX(x), this.rY(y))}`);
                if (this.isWalkable(this.rX(x), this.rY(y))) {
                    walkableGrids[walkableGrids.length] = Pos.p(y, x);
                }
            }
        }
        return walkableGrids;
    }



    private _player: Player;
    public get player(): Player { return this._player; }
    public transferOwnership(newOwner: Player) {
        this._player.removePiece(this);
        this._player = newOwner;
        newOwner.addPiece(this);
    }


}


export type GetPieceFunc = (x: number, y: number) => Piece | null;
export type IsAllianceFunc = (piece: Piece | null) => boolean;
export type IsWalkableFunc = (x: number, y: number, getPiece: GetPieceFunc, isAlliance: IsAllianceFunc) => boolean;

