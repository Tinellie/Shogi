import {Pos} from "../Pos";
import {PieceStatic} from "../Piece/PieceStatic";
import {Piece} from "../Piece/Piece";
import {GetData} from "./GetData";

export class PieceData {


    direction: number;

    get symbol() {
        return this.pieceStatic.name;
    }

    pieceStatic: PieceStatic;

    constructor(direction: number, pieceStatic: PieceStatic) {
        this.direction = direction;
        this.pieceStatic = pieceStatic;
    }
}



export enum GridStatus {
    normal,
    movable,
    movableCaptureble,
    selected,

}

export class GridData {

    /*
    Grid需要的数据
    - 格子样式
        - 可移动
        - 可移动 + 捕获
        - 已选择
        - 无
    - 棋子
    - 玩家的颜色
     */

    status: GridStatus;
    piece: PieceData | null | undefined;
    colorOfPlayer: number;

    constructor(status: GridStatus, piece: PieceData | null | undefined, colorOfPlayer: number) {
        this.status = status;
        this.piece = piece;
        this.colorOfPlayer = colorOfPlayer;
    }
}



export class RowData {
    grids: GridData[];

    constructor(grids: GridData[]) {
        this.grids = grids;
    }

}



export class BoardData {
    get width() { return this.size.x; }
    get height() { return this.size.y; }

    size: Pos;
    rows: RowData[];

    constructor(gridRows: RowData[], size: Pos) {
        this.rows = gridRows;
        this.size = size;
    }
}


export class PieceDataPair {
    pieceData: PieceData;
    no: number;

    constructor(piece: Piece, no: number = 1) {
        this.pieceData = GetData.GetPieceData(piece);
        this.no = no;
    }

    matches(piece: Piece): boolean {
        let data = GetData.GetPieceData(piece);
        return data.symbol === this.pieceData.symbol && data.direction === this.pieceData.direction;
    }

}

export class CapturedPieceData {
    pieces: PieceDataPair[];

    constructor(pieces: PieceDataPair[]) {
        this.pieces = pieces;
    }
}