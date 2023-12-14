import {Board, Grid} from "./Board";
import {Piece, PieceStatic} from "./Piece";
import {Game} from "./Game";
import {Pos} from "./Pos";
import {Player} from "./Player";

export class BoardData {
    size: Pos;
    rows: RowData[];
    constructor(gridRows:RowData[], size: Pos) {
        this.rows = gridRows;
        this.size = size;
    }
}
export class RowData {
    grids: GridData[];
    constructor(grids: GridData[]) {
        this.grids = grids;
    }

}
export class GridData {
    selectable: boolean;
    piece: PieceData | null | undefined;
    currentPlayerDirection: number

    constructor(selectable: boolean, piece: PieceData | null | undefined, currentPlayerDirection: number) {
        this.selectable = selectable;
        this.piece = piece;
        this.currentPlayerDirection = currentPlayerDirection;
    }
}
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

class PieceDataPair {
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

export class GetData {
    static GetBoardData(game: Game, board: Board): BoardData {
        return new BoardData(
            board.grids.map((row, y) => this.GetRowData(game, row, y)),
            board.size
        );
    }
    static GetRowData(game: Game, row: Grid[], y: number): RowData {
        return new RowData(row.map((grid, x) => this.GetGridData(game, grid, x, y)))
    }
    static GetGridData(game: Game, grid: Grid, x: number, y: number): GridData {
        return new GridData(game.players.current.selectedPiece?.isWalkableAbs(x, y) ?? false,
            grid.piece === null ? null : this.GetPieceData(grid.piece),
            game.players.current.direction);
    }
    static GetPieceData(piece: Piece): PieceData {
        return new PieceData(piece.player.direction, piece.static);
    }

    static GetCapturedPiecesData(player: Player): CapturedPieceData {
        let pairs: PieceDataPair[] = [];
        player.capturedPieces.forEach((capturedPiece) => {
            let matchedPair = pairs.find((pair) => pair.matches(capturedPiece));
            if (matchedPair === undefined) {
                //如果列表里没有同类棋子, 那么创建一个新的 Pair
                pairs.push(new PieceDataPair(capturedPiece));
            }
            else {
                matchedPair.no ++;
            }
        });
        pairs.sort((a, b) =>
            a.pieceData.pieceStatic.weight - b.pieceData.pieceStatic.weight);
        return new CapturedPieceData(pairs);
    }
}