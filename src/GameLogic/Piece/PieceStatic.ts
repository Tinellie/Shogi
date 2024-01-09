import {Pos} from "../Pos";
import {GetPieceFunc, IsAllianceFunc, IsWalkableFunc} from "./Piece";
import {King} from "./PieceShogi";

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
        = (rX: number, rY: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc): boolean =>
        isAlliance(piece(rX, rY)) ? false :
            //walkableGrids不为null, 且数组中能找到指定格子
            this.walkableGrids?.find((p: Pos) => p.x === rX && p.y === rY) != null;


    // 返回是否可以升变
    get promotable() : boolean {
        return this.promote !== null;
    }
    // 返回是否可以升变
    get resetable() : boolean {
        return this.reset !== null;
    }
    // 升变的对象, 若是 null 表示无法升变, 否则返回升变后的 piece static
    promote: (() => PieceStatic) | null = null;
    // 升变前的对象, 若是 null 表示无法升变, 否则返回升变前的 piece static
    reset: (() => PieceStatic) | null = null;

    promoteRule: ((p1: Pos,p2:  Pos) => boolean) | null = null;
}
export class PieceStaticLance extends PieceStatic {

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

export class PieceStaticLancePromoted extends PieceStaticLance {
    constructor(name: string, weight: number, symbol: string | null = null) {
        super(name, weight, symbol);
        this.isWalkable =
            (x: number, y: number, piece: GetPieceFunc, isAlliance: IsAllianceFunc) : boolean =>
                this.lanceWalkable(x, y, piece, isAlliance) || King.isWalkable(x, y, piece, isAlliance);
    }
}



