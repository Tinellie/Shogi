import {Board} from "../Board";
import {PieceStatic} from "../Piece/PieceStatic";
import {Game} from "../Game";
import {Pos} from "../Pos";
import {Piece} from "../Piece/Piece";


//每种棋子都有自己的规则, 这些规则会放在本 class 的子类中
export abstract class Rules {


    abstract styledIndex: ((x: number, y: number) => string)

    abstract initPieces: ((game: Game) => PieceStatic[]);

    abstract initBoard: ((game: Game) => Board);// | null;

    abstract globalPromoteRule: (piece: Piece, moveFrom: Pos, moveTo: Pos) => boolean;

    abstract resetCapturePiece: boolean;
}