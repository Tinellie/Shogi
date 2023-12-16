import {Piece} from "../Piece/Piece";


export class Player {
    readonly id: number;

    direction : number;

    pieces: Piece[] = [];
    capturedPieces : Piece[] = [];

    private _selectedPiece : Piece | null = null;
    public get selectedPiece(): Piece | null { return this._selectedPiece; }

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
        s[1] = `Selected: ${this._selectedPiece}`;

        s[2] = `pieces: [`;
        this.pieces.forEach((p) => s[2] += p.id + ", ");
        s[2] += "]";

        s[3] = "captured pieces: [";
        this.capturedPieces.forEach((p) => s[3] += p.id + ", ");
        s[3] += "]";
        return s;
    }

    //检测是否敌对玩家
    isHostileTo(player: Player) {
        return player.direction !== this.direction;
    }

    addPiece(piece: Piece): void {
        piece.transferOwnership(this);
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
        piece.transferOwnership(this);
        for (let i = 0; i < this.capturedPieces.length; i++) {
            if (this.capturedPieces[i].static.weight < piece.static.weight)  {
                let len = this.capturedPieces.length;
                for (let j = len; j > i; j--) {
                    this.capturedPieces[j] = this.capturedPieces[j-1];
                }
                this.capturedPieces[i] = piece;
                return;
            }
        }
        this.capturedPieces.push(piece);
    }

    select(piece: Piece) : void {
        console.log(`- select ${piece.id}`)
        this._selectedPiece = piece;
    }
    selectClear() : void {
        this._selectedPiece = null;
    }
}