import {Piece} from "./Piece";
import {Pos} from "./Pos";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;


export class Player {
    direction : number;

    pieces: Piece[] = [];
    capturedPieces : Piece[] = [];

    selectedPiece : Piece | null = null;

    constructor(direction : number) {
        //this.capturedPiece = [];
        this.direction = direction;
    }

    _getData(): string[] {
        let s: string[] = [];
        s[0] = `Direction: ${this.direction},`;
        s[1] = `Selected: ${this.selectedPiece}`;

        s[2] = `pieces: [`;
        this.pieces.forEach((p) => s[2] += p.id + ", ");
        s[2] += "]";

        s[3] = "captured pieces: [";
        this.capturedPieces.forEach((p) => s[3] += p.id + ", ");
        s[3] += "]";
        return s;
    }

    //检测是否敌对玩家
    isEnemy(player: Player) {
        return player.direction !== this.direction;
    }

    addPiece(piece: Piece): void {
        this.pieces[this.pieces.length] = piece;
    }
    addCapturePiece(piece: Piece): void{
        this.capturedPieces[this.pieces.length] = piece;
    }

    select(piece: Piece) : void {
        console.log(`- select ${piece.id}`)
        this.selectedPiece = piece;
    }
    selectClear() : void {
        this.selectedPiece = null;
    }
}