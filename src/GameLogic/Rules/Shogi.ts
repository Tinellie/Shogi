import {Board} from "../Board";
import {Rules} from "./Rules";
import {Game} from "../Game"
import {
    Bishop,
    BishopPromoted,
    Gold,
    King,
    Knight,
    KnightPromoted,
    Lance,
    LancePromoted,
    Pawn,
    PawnPromoted,
    Rook,
    RookPromoted,
    Silver,
    SilverPromoted
} from "../Piece/PieceShogi";
import * as cn from "chinese-numbering";
import {Piece} from "../Piece/Piece";
import {Pos} from "../Pos";


export class Shogi extends Rules{

    Size: Pos = new Pos(9, 9);


    override styledIndex = (x: number, y: number) => `${x+1}${cn.numberToChinese(y+1)}`



    override initPieces = (game: Game) => [
        new Pawn(),
        new Lance(),
        new Knight(),
        new Silver(),
        new Gold(),
        new Bishop(),
        new Rook(),
        new King(),
        
        new PawnPromoted(),
        new LancePromoted(),
        new KnightPromoted(),
        new SilverPromoted(),
        new BishopPromoted(),
        new RookPromoted(),
    ]


    override initBoard = (game: Game) => {
        return Board.newBoard(game, [
            "         ",
            "         ",
            "         ",
            "         ",
            "         ",
            "         ",
            "ppppppppp",
            " b     r ",
            "lksgxgskl",

        ], game.players.list);
    }

    override globalPromoteRule = (piece: Piece, moveFrom: Pos, moveTo: Pos): boolean => {
        let [minY, maxY] =
            (piece.player.direction === 1)?
                [this.Size.y - 3, this.Size.y - 1] : [0, 2];
        return (minY <= moveFrom.y && moveFrom.y <= maxY) ||
               (minY <= moveTo.y   && moveTo.y   <= maxY)
    }

    override resetCapturePiece: boolean = true;


}