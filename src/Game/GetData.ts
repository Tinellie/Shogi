import {Board, Grid} from "./Board";
import {Piece} from "./Piece";
import {Game} from "./Game";

export class BoardData {
    rows: RowData[];
    constructor(gridRows:RowData[],) {
        this.rows = gridRows;
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

    constructor(selectable: boolean, piece: PieceData | null | undefined) {
        this.selectable = selectable;
        this.piece = piece;
    }
}
export class PieceData {
    direction: number;
    symbol: string;

    constructor(direction: number, symbol: string) {
        this.direction = direction;
        this.symbol = symbol;
    }
}

export class GetData {
    static GetBoardData(game: Game, board: Board): BoardData {
        return new BoardData(board.grids.map((row, y) => this.GetRowData(game, row, y)))
    }
    static GetRowData(game: Game, row: Grid[], y: number): RowData {
        return new RowData(row.map((grid, x) => this.GetGridData(game, grid, x, y)))
    }
    static GetGridData(game: Game, grid: Grid, x: number, y: number): GridData {
        return new GridData(game.currentPlayer.selectedPiece?.isWalkableAbs(x, y) ?? false,
            grid.piece === null ? null : this.GetPieceData(game, grid.piece));
    }
    static GetPieceData(game: Game, piece: Piece): PieceData {
        return new PieceData(piece.player.direction, piece.name);
    }
}