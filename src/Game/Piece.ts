import {Player} from "./Player";
import {Board, Grid} from "./Board";
import {P} from "./Game";
import * as cn from "chinese-numbering";


export class Piece {
    player: Player;
    static: PieceStatic;
    promoted: boolean = false;

    get name(): string {
        return this.static.name;
    }
    get symbol(): string {
        return this.static.symbol ?? this.name[0];
    }

    p: P;
    absX = (rX: number) => this.p.x + rX ;//* this.player.direction;
    absY = (rY: number) => this.p.y + rY * this.player.direction;
    rX = (absX: number) => absX - this.p.x;//* this.player.direction;
    rY = (absY: number) => (absY - this.p.y) / this.player.direction;//* this.player.direction;

    constructor(board: Board, type: PieceStatic, player: Player, x: number, y: number) {
        this.player = player;
        player.addPiece(this);

        this.static = type;

        this.p = new P(x, y);

        this.getPiece = (x, y) => board.g(this.absX(x), this.absY(y)).piece;
    }

    toString(): string {
        return `${this.p.x}${cn.numberToChinese(this.p.y, "traditional")}${this.static}`;
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


    //逐个格子遍历, 获取能行走的棋子
    getWalkableGrids(boardSize: P): P[] {
        let walkableGrids: P[] = [];
        // console.log(`size ${boardSize.x},${boardSize.y}`);
        // console.log(`pos ${this.p.toString()}`);
        // console.log(`direction ${this.player.direction}`);
        // console.log(this.static.walkableGrids);

        for(let x: number = 0; x < boardSize.x; x++) {
            for(let y: number = 0; y < boardSize.y; y++) {
                //console.log(`isWalkable (${x},${y}) => (${this.rX(x)},${this.rY(y)}) = ${this.isWalkable(this.rX(x), this.rY(y))}`);
                if (this.isWalkable(this.rX(x), this.rY(y))) {
                    walkableGrids[walkableGrids.length] = P.p(y, x);
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

    get className() : string {
        return this.constructor.name;
    }

    walkableGrids: P[] | null = [];
    longRange: boolean = false;

    constructor(name: string, symbol: string | null = null) {
        this.name = name;
        this.symbol = symbol;
    }

    toString(): string {
        return this.name;
    }


    public isWalkable : IsWalkableFunc
        = (x: number, y: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc): boolean =>
        isAlliance(piece(x, y)) ? false :
            //walkableGrids不为null, 且数组中能找到指定格子
            this.walkableGrids?.find((p: P) => p.x === x && p.y === y) != null;


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

    constructor(name: string, symbol: string | null = null) {
        super(name, symbol);
        this.isWalkable = this.lanceWalkable;

        this.longRange = true;
    }
}

class PieceStaticLancePromoted extends PieceStaticLance {
    constructor(name: string, symbol: string | null = null) {
        super(name, symbol);
        this.isWalkable =
            (x: number, y: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc) : boolean =>
                this.lanceWalkable(x, y, piece, isAlliance) && King.isWalkable(x, y, piece, isAlliance);
    }
}




export class Pawn extends PieceStatic {
    constructor() {
        super("步兵", "p");
        this.walkableGrids = [ P.p(1, 0)];
        this.promote = () => new PawnPromoted();
    }
}
export class PawnPromoted extends PieceStatic {
    constructor() {
        super("と", "P");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Pawn();
    }
}


export class Lance extends PieceStaticLance {
    constructor() {
        super("香車", "l");
        this.promote = () => new LancePromoted();
        this.walkableGrids = [P.p(1, 0)];
    }
}
export class LancePromoted extends PieceStatic {
    constructor() {
        super("仝", "L");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Lance();
    }
}


export class Knight extends PieceStatic {
    constructor() {
        super("桂馬", "k");
        this.walkableGrids = P.array(
            [
                [2, -1],
                [2, 1]
            ]);
        this.promote = () => new KnightPromoted();
    }
}
export class KnightPromoted extends PieceStatic {
    constructor() {
        super("圭", "K");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Knight();
    }
}


export class Silver extends PieceStatic {
    constructor() {
        super("銀將", "s");
        this.walkableGrids = P.array(
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
        super("と", "S");
        this.walkableGrids = Gold.walkableGrids;
        this.reset = () => new Silver();
    }
}


export class Gold extends PieceStatic {

    static walkableGrids = P.array(
        [
            [1, -1],
            [1, 0],
            [1, 1],
            [0, -1],
            [0, 1],
            [-1, 0],
        ]);

    constructor() {
        super("金將", "g");
        this.walkableGrids = Gold.walkableGrids;
    }

}

export class Bishop extends PieceStaticLance {
    static walkableGrids =
        P.array([
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ]);

    constructor() {
        super("角行", "b");
        this.walkableGrids = Bishop.walkableGrids;
        this.promote = () => new BishopPromoted();
    }
}
export class BishopPromoted extends PieceStaticLancePromoted {
    constructor() {
        super("龍馬", "B");
        this.walkableGrids = Bishop.walkableGrids;
        this.reset = () => new Bishop();
    }
}


export class Rook extends PieceStaticLance {
    static walkableGrids =
        P.array([
            [0, -1],
            [0,  1],
            [1,  0],
            [-1, 0],
        ]);
    constructor() {
        super("飛車", "r");
        this.walkableGrids = Rook.walkableGrids;
        this.promote = () => new RookPromoted();
    }
}
export class RookPromoted extends PieceStaticLancePromoted {
    constructor() {
        super("龍王", "R");
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
        super("王将", "x");
        this.isWalkable = King.isWalkable;
    }
}


