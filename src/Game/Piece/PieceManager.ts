import {Piece} from "./Piece";
import {PieceStatic} from "./PieceStatic";
import {Board} from "../Board";
import {Player} from "../Player/Player";
import {Game} from "../Game";

export class PieceManager {

    readonly game: Game;

    statics: PieceStatic[] = [];

    constructor(game: Game) {
        this.game = game;
    }

    generatePieceS(symbol: string, board: Board, player: Player): Piece {
        let p = this.findStaticWithSymbol(symbol);
        console.log(`- Manager.GeneratePieceS symbol=${symbol} 行 列 name=${this.symbolToName(symbol)} static.name=${p?.name}`);
        // eslint-disable-next-line no-throw-literal
        if (p == null) throw `Piece with symbol "${symbol}" not Found`;
        return new Piece(this.game, board, p, player);
    }
    generatePiece(name: string, board: Board, player: Player): Piece {
        let p = this.findStaticWithName(name);
        // eslint-disable-next-line no-throw-literal
        if (p == null) throw `Piece with name "${name}" not Found`;
        return new Piece(this.game, board, p, player);
    }

    addStatic(piece: PieceStatic) : void {
        this.statics[this.statics.length] = piece;
    }
    clearStatics(): void{
        this.statics = [];
    }
    addStatics(pieces: PieceStatic[]) : void {
        pieces.forEach((piece) => this.addStatic(piece))
    }

    //给定符号, 获取符号对应棋子的名字
    symbolToName(symbol: string): string | undefined {
        return this.findStaticWithSymbol(symbol)?.name;
    }

    //给定符号, 返回对应的 static
    findStaticWithSymbol(symbol: string) : PieceStatic | undefined {
        return this.statics.find((p: PieceStatic): boolean => p.symbol === symbol)
    }

    //给定名字, 返回对应的 static
    findStaticWithName(name: string) : PieceStatic | undefined {
        return this.statics.find((p: PieceStatic): boolean => p.name === name)
    }
    findStaticWithNameFirstChar(name: string) : PieceStatic | undefined {
        return this.statics.find((p: PieceStatic): boolean => p.name[0] === name)
    }



}