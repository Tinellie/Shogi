import {Piece} from "../Piece/Piece";
import {Grid} from "../Board";


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
    isHostileTo(player: Player): boolean {
        return player.direction !== this.direction;
    }

    isOwnGrid(grid: Grid): boolean {
        return grid?.belongTo(this) ?? false;
    }
    isHostileGrid(grid: Grid): boolean {
        return grid !== null && this.isHostileTo(grid.player);
    }

    addPiece(piece: Piece): void {
        this.pieces.push(piece);
    }
    removePiece(piece: Piece): void {
        let i = this.pieces.findIndex((piece2) => piece2 === piece);
        if (i === -1) throw new Error(`Piece Not Found when trying to remove piece ${piece.id} from ${this}`);
        for (i++; i < this.pieces.length; i++) {
            this.pieces[i-1] = this.pieces[i];
        }
        this.pieces.pop();
    }

    // 捕获棋子<br/>
    // 会自动移交棋子所有权<br/>
    // 随后按照棋子权值由大到小, 把捕获的棋子插入到 capturedPiece 中
    capturePiece(piece: Piece): void{
        piece.transferOwnership(this);

        //从 capturedPieces 开头遍历
        for (let i = 0; i < this.capturedPieces.length; i++) {

            //如果捕获的棋子大于自己, 或者是相同的棋子, 继续遍历
            if (this.capturedPieces[i].static.weight >= piece.static.weight)  continue;

            //直到找到小于自己的棋子, 插入这个棋子前面
            let len = this.capturedPieces.length;
            for (let j = len; j > i; j--) {
                this.capturedPieces[j] = this.capturedPieces[j-1];
            }
            this.capturedPieces[i] = piece;
            return;

        }
        //如果没找到合适的棋子 (全部棋子大于等于自己, 或者数组为空)
        //把自己push到队尾
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