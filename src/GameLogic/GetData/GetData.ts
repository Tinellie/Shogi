import {Board, Grid} from "../Board";
import {Piece} from "../Piece/Piece";
import {Game} from "../Game";
import {Player} from "../Player/Player";
import {BoardData, CapturedPieceData, GridData, GridStatus, PieceData, PieceDataPair} from "./Data";

export class GetData {
    static GetBoardData(board: Board): BoardData {
        return new BoardData(
            board.size
        );
    }

    // static GetBoardData(game: GameLogic, board: Board): BoardData {
    //     return new BoardData(
    //         board.rows.map((row, y) => this.GetRowData(game, row, y)),
    //         board.size
    //     );
    // }
    // static GetRowData(game: GameLogic, row: GridJSX[], y: number): RowData {
    //     return new RowData(row.map((_, x) => this.GetGridData(game, x, y)))
    // }

    // 获取格子的数据,<br/>
    // game: 当前游戏<br/>
    // grid: 需要获取数据的格子<br/>
    // x, y: 格子的坐标
    static GetGridData(game: Game, x: number, y: number): GridData {
        let grid: Grid = game.board.grid(x, y);
        let status: GridStatus = GridStatus.normal;
        //如果格子可以走动
        if (game.currentPlayer.selectedPiece?.pos?.equal(x, y)) {
            status = GridStatus.selected;
        }
        if (game.currentPlayer.selectedPiece?.isValidWalkableAbs(x, y))
            status =
            game.currentPlayer.isHostileGrid(grid) ?
                GridStatus.movableCapturable : //如果格子是敌对玩家持有的
                GridStatus.movable; //如果不是

        return new GridData(status,
            grid === null ? null : this.GetPieceData(grid), game.players.current.direction);


        /*return new GridData(game.players.current.selectedPiece?.isValidWalkableAbs(x, y) ?? false,
            grid === null ? null : this.GetPieceData(grid),
            game.players.current.direction);*/
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