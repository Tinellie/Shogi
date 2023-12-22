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
        if (this.board.gridP(this._pos) !== this){
            throw new Error(`Piece ${this} is located at ${this.board.getPos(this)}, but Piece._pos == ${this._pos}`);
        }

        return this._pos;
    }
    public set pos(pos: Pos) {
        if (this.board.gridP(pos) !== this){
            throw new Error(`Piece ${this} is located at ${this.board.getPos(this)}, but try to set pos to ${pos}`);
        }
        this._pos = pos;
    }
    absP = (rX: number, rY: number) => new Pos(this.absX(rX), this.absY(rY));
    absX = (rX: number) => this.pos.x + rX ;//* this.player.direction;
    absY = (rY: number) => this.pos.y + rY * this._player.direction;
    rP = (absX: number, absY: number) => new Pos(this.rX(absX), this.rY(absY));
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
    getPiece: GetPieceFunc = (rx: number, ry: number) => {
        return this.board.grid(this.absX(rx), this.absY(ry));
    }


    //以相对坐标指定一个格子，返回 bool 值表示是否可以行走
    isWalkable (rX: number, rY: number): boolean  {
        return this.static.isWalkable(
            rX, rY,
            this.getPiece,
            (p: Piece | null): boolean => p?._player === this._player
        );
    }
    //以绝对坐标指定一个格子，返回 bool 值表示是否可以行走
    isWalkableAbs (absX: number, absY: number): boolean {
        return this.isWalkable(this.rX(absX), this.rY(absY));
    }
    //以相对坐标指定一个格子，返回 bool 值表示是否可以行走 且移动合法
    isValidWalkable(rX: number, rY: number): boolean{
        return this.isWalkable(rX, rY) && this.board.checkMoveValidity(this, this.absP(rX, rY))
    }
    //以绝对坐标指定一个格子，返回 bool 值表示是否可以行走
    isValidWalkableAbs (absX: number, absY: number): boolean {
        return this.isValidWalkable(this.rX(absX), this.rY(absY));
    }

    //逐个格子遍历, 获取能行走的棋子
    getGrids(condition: (rx: number, ry: number)=>boolean): Pos[] {
        let walkableGrids: Pos[] = [];

        for(let x: number = 0; x < this.board.width; x++) {
            for(let y: number = 0; y < this.board.height; y++) {
                let [rx, ry] = this.rP(x, y).decompose;
                if (condition(rx, ry)){
                    //检测是否可以移动, 移动是否合法
                    //如果可以移动, 那么添加到列表
                    walkableGrids.push(new Pos(x, y));
                }

            }
        }
        return walkableGrids;
    }
    //逐个格子遍历, 获取能行走且移动合法的棋子
    getValidWalkableGrids(): Pos[] {
        return this.getGrids((rx, ry) => this.isValidWalkable(rx, ry));
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

