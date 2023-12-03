import {Board} from "./Board";
import {Piece, PieceStatic} from "./Piece";


//每种棋子都有自己的规则, 这些规则会放在本 class 的子类中
export abstract class Rules {


    abstract initPieces: (() => PieceStatic[]);

    abstract initBoard: (() => Board);// | null;
}