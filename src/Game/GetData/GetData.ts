import {Board, Grid} from "../Board";
import {Piece} from "../Piece/Piece";
import {Game} from "../Game";
import {Player} from "../Player/Player";
import {BoardData, CapturedPieceData, GridData, PieceData, PieceDataPair, RowData} from "./Data";

export class GetData {
    static GetBoardData(game: Game, board: Board): BoardData {
        return new BoardData(
            board.rows.map((row, y) => this.GetRowData(game, row, y)),
            board.size
        );
    }
    static GetRowData(game: Game, row: Grid[], y: number): RowData {
        return new RowData(row.map((grid, x) => this.GetGridData(game, grid, x, y)))
    }
    static GetGridData(game: Game, grid: Grid, x: number, y: number): GridData {
        return new GridData(game.players.current.selectedPiece?.isWalkableAbs(x, y) ?? false,
            grid === null ? null : this.GetPieceData(grid),
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