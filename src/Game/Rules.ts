import {Board} from "./Board";
import {Piece, PieceStatic} from "./Piece";
import {Game} from "./Game";


//每种棋子都有自己的规则, 这些规则会放在本 class 的子类中
export abstract class Rules {

    abstract styledIndex: ((x: number, y: number) => string)

    abstract initPieces: ((game: Game) => PieceStatic[]);

    abstract initBoard: ((game: Game) => Board);// | null;



    constructor() {
    }
}