import {Pos} from "../Pos";
import {PieceStatic, PieceStaticLance, PieceStaticLancePromoted} from "./PieceStatic";
import {GetPieceFunc, IsAllianceFunc} from "./Piece";

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


