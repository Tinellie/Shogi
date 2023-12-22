import {Piece} from "./Piece/Piece";
import {Player} from "./Player/Player";
import {Game} from "./Game"
import {Pos} from "./Pos";

export type Grid = Piece | null;

export class Board {

    readonly game: Game;

    public size: Pos;
    public get width() { return this.size.x; }
    public get height() { return this.size.y; }

    private readonly grids : Grid[];
    //grids : Grid[][];
    grid(x : number, y : number) : Grid {
        return this.grids[y * this.width + x];
    }
    gridP(pos : Pos) : Grid {
        return this.grid(pos.x, pos.y);
    }
    occupied(pos: Pos): boolean {
        return this.gridP(pos) !== null;
    }
    setGrid(pos: Pos, piece: Grid) {
        this.grids[pos.y * this.width + pos.x] = piece;
        if (piece !== null){
            piece.pos = pos.clone;
            piece.board = this;
        }
    }

    row(y: number): Grid[] {
        let row: Grid[] = Array(this.width)
        for (let x = 0; x < this.width; x++) {
            row[x] = this.grid(x, y);
        }
        return row;
    }
    get rows(): Grid[][] {
        let rows: Grid[][] = Array(this.height)
        for (let y = 0; y < this.height; y++) {
            rows[y] = this.row(y);
        }
        return rows;
    }
    column(x: number): Grid[] {
        let column: Grid[] = Array(this.height)
        for (let y = 0; y < this.height; y++) {
            column[y] = this.grid(x, y);
        }
        return column;
    }
    get columns(): Grid[][] {
        let columns: Grid[][] = Array(this.width)
        for (let x = 0; x < this.width; x++) {
            columns[x] = this.column(x);
        }
        return columns;
    }





    handleClick(x : number, y : number, player : Player, updateGridMethod: (x: number, y: number) => void) : /*Pos[]*/void {
        console.log(`Handle Click: (${x},${y}), player: ${player.direction/*_getData()*/}`)
        let currentPiece: Grid = this.grid(x, y);

        if (player.selectedPiece === null ||
            (currentPiece?.belongTo(player) && currentPiece !== player.selectedPiece)) {
            //如果没有选择棋子
            //或点击的格子是属于玩家的棋子, 且不等于当前选择的棋子 那么选择格子

            console.log(currentPiece);
            console.log(`- belong to current player? ${currentPiece?.player === player}`);
            if (currentPiece !== null && currentPiece.player === player) {
                player.select(currentPiece);
                //获取该棋子可移动的格子, 设置高亮
                //player.selectedPiece?.getWalkableGrids()
            }
        }
        else {
            //如果已经选择了棋子
            //且点选的格子不属于自己, 或是点选已选择的格子
            //那么判断是否能够移动
            //移动棋子, 如果点选了无法移动的格子会返回 false
            if (this.tryMove(player.selectedPiece, new Pos(x, y))){
                this.game.players.nextPlayer();
                console.log("-------- turn ends --------")
            }
            //清除已选棋子;
            player.selectClear();
        }

    }




    constructor(game: Game, size: Pos) {
        this.game = game;

        this.size = size;
        this.grids = Array(size.area).fill(null);

    }

    static newBoard(game: Game, data: string[], players: Player[]): Board {
        console.log(`Start newBoard(), player [${players.length}]`)
        console.log(`- for reference - Piece Static -`);
        console.log(game.pieces.statics);

        let size: Pos = Pos.p(data.length, data[0].length);
        let board: Board = new Board(game, size);

        //遍历玩家
        for (let p = 0; p < players.length; p++) {
            //y: 0=>8
            for (let y = 0; y < data.length; y++) {

                //读取 data 的底部是第八行, 而不是第零行, 8=>0
                let y2 = data.length-y-1

                //x: 0=>8
                for (let x = 0; x < data[y2].length; x++) {
                    //从底部阅读到顶部, 从左侧阅读到右侧
                    let symbol = data[y2][x];

                    //如果是空格子, 跳过
                    //console.log(`symbol(${x}, ${data.length-y-1}): ${symbol}`);
                    if (symbol === " ") continue;
                    //console.log("B");

                    let d = players[p].direction;

                    //否则生成棋子,
                    //如果 direction 是正数, 就从左下角(0, 0)往右上角数
                    //如果 direction 是负数, 就从左下角(8, 8)往左下角数
                    board.generatePieceS(symbol, players[p],
                        d >= 0 ? x : size.x-x-1,
                        d >= 0 ? y : size.y-y-1);
                }
            }
        }
        return board;
    }

    //生成有给定符号的棋子
    generatePieceS(symbol: string, player: Player, x: number, y: number): void {
        console.log(`start generate piece ${symbol} at (${x}, ${y})`);
        this.place(this.game.pieces.generatePieceS(symbol, this, player), new Pos(x, y));
    }

    toString(): string {
        let result: string = "";
        for (let y = this.height - 1; y >= 0; y--) {
            for (let x = 0; x < this.width; x++) {
                result += this.grid(x, y);
            }
            result += "\n";
        }
        return result;
    }




    f(g: Game){

        let x = 0;
        let y = 0;
        let piece = g.board.grid(x, y) as Piece;
        let grids = piece.getValidWalkableGrids();
        let output : string = "";
        for (let iy= 0; iy < 9; iy++) {
            for (let ix= 0; ix < 9; ix++) {
                output += (grids.find((pos) => pos.x === ix && pos.y === iy))? "x" : "0";
            }
            output += "\n";
        }

        console.warn(`piece ${piece.name}, walkable Grids: ${"\n" +output}`);
    }



    //检查棋子 piece 移动到 pos 是否合法 (是否会将军等问题)
    checkMoveValidity(piece: Piece, pos: Pos): boolean {
        // if(/*正在将军*/) {
        //     //检查移动后是否解决将军
        //     if (/*没解决*/) return false;
        // }
        //
        // if (/*移动后导致被将军*/) {
        //     return false;
        // }

        return true;
    }


    tryMove(piece: Piece, pos: Pos): boolean {
        console.log(`- try move ${piece.id} to ${pos}`);

        //如果不是可移动的格子, 直接返回假
        if (!piece.isValidWalkableAbs(pos.x, pos.y)) {
            console.log(`- not valid movable grid`)
            return false;
        }

        //如果目标格子有敌对棋子, 捕获它
        let piece2 = this.gridP(pos);
        if (piece2 !== null){
            if (piece.player.isHostileTo(piece2.player)) {
                console.log(`- capture ${piece2.id}`);
                piece.player.capturePiece(piece2);
                this.removeAt(pos);
            }
        }

        console.log(`- move ${piece.id} to ${pos}`);
        //移动棋子
        this.move(piece, pos);

        return true;
    }



    //移动棋子到棋盘上指定位置, 如果目标格子被占据会报错
    private move(piece: Piece, pos: Pos){
        //把棋子从棋盘上移走
        this.remove(piece);
        this.place(piece, pos);
    }



    //放置棋子, 如果格子被占据, 会报错
    public place(piece: Piece, pos: Pos) {
        if (this.occupied(pos))
            throw new Error(`Piece ${this} tried to move to Grid ${pos} which has been occupied by ${this.gridP(pos)}`);
        this.setGrid(pos, piece);
    }
    //移除棋子, 如果棋子不存在, 将会报错
    public remove(piece: Piece) {
        try {
            this.removeAt(this.getPos(piece));
        }catch (e) {
            throw new Error(`${e}, but trying to Remove piece from this Board`);
        }
    }
    //移除位于指定位置的格子
    public removeAt(pos: Pos) {
        this.setGrid(pos, null);
    }



    //尝试获取棋子的坐标, 如果棋子不存在, 将会报错
    public getPos(piece: Piece): Pos {
        let a = this.tryGetPos(piece);
        if (a !== undefined) {
            return a;
        }
        throw new Error(`Piece ${piece} is not on this Board`);
    }
    //尝试获取棋子的坐标, 如果棋子不存在, 返回 undefined
    public tryGetPos(piece: Piece): Pos | undefined {
        return this.grids.find((grid) => grid === piece)?.pos
    }
    //判断棋子是否在棋盘上
    public isOnBoard(piece: Piece): boolean {
        return this.tryGetPos(piece) !== undefined;
    }


}
