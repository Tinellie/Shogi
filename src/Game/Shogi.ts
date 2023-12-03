import {Board} from "./Board";
import {Rules} from "./Rules";
import {Game, P} from "./Game"
import {
    Bishop, BishopPromoted,
    Gold, King,
    Knight, KnightPromoted,
    Lance, LancePromoted,
    Pawn, PawnPromoted,
    Rook, RookPromoted,
    Silver, SilverPromoted
} from "./Piece";


export class Shogi extends Rules{

    override initPieces = () => [
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


    override initBoard = () => {
        let board: Board = Board.newBoard([
            "         ",
            "         ",
            "         ",
            "         ",
            "   l     ",
            "         ",
            "      ppp",
            " b     r ",
            "lksgxgskl",

        ], Game.players.list);

        return board;
    }


}