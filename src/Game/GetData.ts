import {Board, Grid} from "./Board";
import {Piece} from "./Piece";
import {Game} from "./Game";
import {Pos} from "./Pos";

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
    symbol: string;

    constructor(direction: number, symbol: string) {
        this.direction = direction;
        this.symbol = symbol;
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
            grid.piece === null ? null : this.GetPieceData(game, grid.piece),
            game.players.current.direction);
    }
    static GetPieceData(game: Game, piece: Piece): PieceData {
        return new PieceData(piece.player.direction, piece.name);
    }
}