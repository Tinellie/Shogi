import {Piece} from "./Piece";
import {Pos} from "./Pos";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;


export class Player {
    readonly id: number;

    direction : number;

    pieces: Piece[] = [];
    capturedPieces : Piece[] = [];

    selectedPiece : Piece | null = null;

    constructor(id: number, direction : number) {
        this.id = id;
        //this.capturedPiece = [];
        this.direction = direction;
    }

    toString(): string {
        return `Player #${this.id}`;
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
        this.pieces.push(piece);
    }
    removePiece(piece: Piece): void {
        let i = this.pieces.findIndex((piece2) => piece2.id === piece.id);
        if (i === -1) throw new Error(`Piece Not Found when trying to remove piece ${piece.id} from ${this}`);
        for (i++; i < this.pieces.length; i++) {
            this.pieces[i-1] = this.pieces[i];
        }
        this.pieces.pop();
    }

    addCapturePiece(piece: Piece): void{
        this.capturedPieces.push(piece);
    }

    select(piece: Piece) : void {
        console.log(`- select ${piece.id}`)
        this.selectedPiece = piece;
    }
    selectClear() : void {
        this.selectedPiece = null;
    }
}