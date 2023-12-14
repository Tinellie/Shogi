import {Player} from "./Player";
import {Board, Grid} from "./Board";
import {Game} from "./Game";
import {Pos} from "./Pos";
import * as cn from "chinese-numbering";


export class Piece {
    game: Game;

    player: Player;
    static: PieceStatic;
    promoted: boolean = false;

    get name(): string {
        return this.static.name;
    }
    get symbol(): string {
        return this.static.symbol ?? this.name[0];
    }
    //识别名, 即坐标加名字第一个字符
    get id(): string {
        return this.onBoard ?
            this.game.rules.styledIndex(this.pos.x, this.pos.y) + this.name[0] :
            this.name;
    }

    onBoard: boolean = false;
    pos: Pos;
    absX = (rX: number) => this.pos.x + rX ;//* this.player.direction;
    absY = (rY: number) => this.pos.y + rY * this.player.direction;
    rX = (absX: number) => absX - this.pos.x;//* this.player.direction;
    rY = (absY: number) => (absY - this.pos.y) / this.player.direction;//* this.player.direction;

    constructor(game: Game, board: Board, type: PieceStatic, player: Player) {
        this.game = game;

        this.player = player;
        player.addPiece(this);

        this.static = type;

        this.pos = new Pos(0,0);
        this.onBoard = false;

        this.getPiece = (x, y) => board.g(this.absX(x), this.absY(y)).piece;
    }

    toString(): string {
        return `${this.id}`;
    }

    belongTo = (player: Player) => player === this.player;

    //以 **相对坐标** 获取指定格子上的棋子
    getPiece: GetPieceFunc;

    //以相对坐标指定一个格子，返回 bool 值表示是否可以行走
    isWalkable (rx: number, ry: number): boolean  {
        //console.log(`p: (${rx},${ry})   rp: (${this.absX(rx)},${this.absY(ry)})`);
        let r = this.static.isWalkable(
            rx, ry,
            this.getPiece,
            (p: Piece | null): boolean => p?.player === this.player
        );

        //console.log(`   = ${r}`);
        return r;
    }
    isWalkableAbs (absX: number, absY: number): boolean {
        return this.isWalkable(this.rX(absX), this.rY(absY));
    }



    //逐个格子遍历, 获取能行走的棋子
    getWalkableGrids(boardSize: Pos): Pos[] {
        let walkableGrids: Pos[] = [];
        // console.log(`size ${boardSize.x},${boardSize.y}`);
        // console.log(`pos ${this.p.toString()}`);
        // console.log(`direction ${this.player.direction}`);
        // console.log(this.static.walkableGrids);

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



}


type GetPieceFunc = (x: number, y: number) => Piece | null;
type IsAllianceFunc = (piece: Piece | null) => boolean;
type IsWalkableFunc = (x: number, y: number, getPiece: GetPieceFunc, isAlliance: IsAllianceFunc) => boolean;


export class PieceStatic {

    name: string;
    symbol: string | null;
    weight: number;

    get className() : string {
        return this.constructor.name;
    }

    walkableGrids: Pos[] | null = [];
    longRange: boolean = false;

    constructor(name: string, weight: number, symbol: string | null = null) {
        this.name = name;
        this.symbol = symbol;
        this.weight = weight;
    }

    toString(): string {
        return this.name;
    }

    //棋子静态资源判断移动的逻辑
    //给定相对坐标, 返回格子是否能够移动
    public isWalkable : IsWalkableFunc
        = (rx: number, ry: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc): boolean =>
        isAlliance(piece(rx, ry)) ? false :
            //walkableGrids不为null, 且数组中能找到指定格子
            this.walkableGrids?.find((p: Pos) => p.x === rx && p.y === ry) != null;


    get promotable() : boolean {
        return this.promote !== null;
    }
    promote: () => (PieceStatic | null) = () => null;
    reset: () => (PieceStatic | null) = () => null;
}
class PieceStaticLance extends PieceStatic {

    lanceWalkableToward (dx: number, dy: number, length: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc): boolean {

        //如果最后一格有己方棋子阻碍, 直接返回假
        if (isAlliance(piece(dx * length, dy * length))) return false;

        //遍历路径上的格子, 如果有棋子阻碍, 直接返回假
        for (let d: number = 1; d < length; d++) {
            if (piece(d * dx, d * dy)) return false;
        }
        //否则返回真
        return true;
    }
    lanceWalkable (x: number, y: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc): boolean {
        let xn = Math.sign(x);
        let yn = Math.sign(y);
        let xMag = Math.abs(x);
        let yMag = Math.abs(y);

        //如果行走格子中, 不包含这个方向, 直接返回 false
        if (!this.walkableGrids?.find((pos) => pos.x === xn && pos.y === yn)) return false;

        //如果是直线的话, 那一定在直线上, 无需额外检测
        //斜线的话, 需要检测是不是正好45°的斜线 (x,y 大小相等)
        if (x !== 0 && y !== 0 && xMag !== yMag) return false;

        return this.lanceWalkableToward(xn, yn, xMag? xMag : yMag, piece, isAlliance);
    }

    constructor(name: string, weight: number, symbol: string | null = null) {
        super(name, weight, symbol);
        this.isWalkable = this.lanceWalkable;

        this.longRange = true;
    }
}

class PieceStaticLancePromoted extends PieceStaticLance {
    constructor(name: string, weight: number, symbol: string | null = null) {
        super(name, weight, symbol);
        this.isWalkable =
            (x: number, y: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc) : boolean =>
                this.lanceWalkable(x, y, piece, isAlliance) && King.isWalkable(x, y, piece, isAlliance);
    }
}




export class Pawn extends PieceStatic {
    constructor() {
        super("步兵", 0, "p");
        this.walkableGrids = [ Pos.p(1, 0)];
        this.promote = () => new PawnPromoted();
    }
}
export class PawnPromoted extends PieceStatic {
    constructor() {
        super("と", 0.1, "P");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Pawn();
    }
}


export class Lance extends PieceStaticLance {
    constructor() {
        super("香車", 1, "l");
        this.promote = () => new LancePromoted();
        this.walkableGrids = [Pos.p(1, 0)];
    }
}
export class LancePromoted extends PieceStatic {
    constructor() {
        super("仝", 1.1, "L");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Lance();
    }
}


export class Knight extends PieceStatic {
    constructor() {
        super("桂馬", 2, "k");
        this.walkableGrids = Pos.array(
            [
                [2, -1],
                [2, 1]
            ]);
        this.promote = () => new KnightPromoted();
    }
}
export class KnightPromoted extends PieceStatic {
    constructor() {
        super("圭", 2.1, "K");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Knight();
    }
}


export class Silver extends PieceStatic {
    constructor() {
        super("銀將", 3, "s");
        this.walkableGrids = Pos.array(
            [
                [1, -1],
                [1, 0],
                [1, 1],
                [-1, -1],
                [-1, 1],
            ]);
        this.promote = () => new SilverPromoted();
    }
}
export class SilverPromoted extends PieceStatic {
    constructor() {
        super("と", 3.1, "S");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Silver();
    }
}


export class Gold extends PieceStatic {

    static walkableGrids = Pos.array(
        [
            [1, -1],
            [1, 0],
            [1, 1],
            [0, -1],
            [0, 1],
            [-1, 0],
        ]);

    constructor() {
        super("金將", 4, "g");
        this.walkableGrids = Gold.walkableGrids;
    }

}

export class Bishop extends PieceStaticLance {
    static walkableGrids =
        Pos.array([
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ]);

    constructor() {
        super("角行", 10, "b");
        this.walkableGrids = Bishop.walkableGrids;
        this.promote = () => new BishopPromoted();
    }
}
export class BishopPromoted extends PieceStaticLancePromoted {
    constructor() {
        super("龍馬", 10.1, "B");
        this.walkableGrids = Bishop.walkableGrids;
        this.reset = () => new Bishop();
    }
}


export class Rook extends PieceStaticLance {
    static walkableGrids =
        Pos.array([
            [0, -1],
            [0,  1],
            [1,  0],
            [-1, 0],
        ]);
    constructor() {
        super("飛車", 11, "r");
        this.walkableGrids = Rook.walkableGrids;
        this.promote = () => new RookPromoted();
    }
}
export class RookPromoted extends PieceStaticLancePromoted {
    constructor() {
        super("龍王", 11.1, "R");
        this.walkableGrids = Rook.walkableGrids;
        this.reset = () => new Rook();
    }
}


export class King extends PieceStatic {
    static isWalkable(x: number, y: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc) : boolean {
        return !isAlliance(piece(x, y)) //格子处没有己方棋子阻挡
            && !(x === 0 && y === 0) //格子不是 0,0
            && Math.abs(x) <= 1 && Math.abs(y) <= 1; //格子距离小于1 (身边八格)
    }

    constructor() {
        super("王将", 100, "x");
        this.isWalkable = King.isWalkable;
    }
}


