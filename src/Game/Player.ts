import {Piece} from "./Piece";


export class Player {
    direction : number;

    pieces: Piece[] = [];
    capturedPieces : Piece[] = [];

    selectedGrid : [number, number] | null = null;

    constructor(direction : number) {
        //this.capturedPiece = [];
        this.direction = direction;
    }

    addPiece(piece: Piece): void {
        this.pieces[this.pieces.length] = piece;
    }

    select(x : number, y : number) : void {
        this.selectedGrid = [x, y];
    }
    selectClear() : void {
        this.selectedGrid = null;
    }
}