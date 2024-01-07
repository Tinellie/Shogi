import {Game} from "./Game";
import {Pos} from "./Pos";
import {Player} from "./Player/Player";


export class RenderManager{
    private game: Game;

    private _rerenderAllMethod: (()=>void) | null = null;
    public set rerenderAllMethod(value: (()=>void)) {
        this._rerenderAllMethod = value;
    }
    public rerenderAll() {
        if(this._rerenderAllMethod === null) throw new Error("RenderManager._rerenderAllMethod is null")
        this._rerenderAllMethod();
    }

    public readonly rerenderGridMethodsArray: (()=>void)[][];

    public walkableGrids: Pos[] = [];
    public select(player: Player, selectedGrid: Pos){
        //获取该棋子可移动的格子, 设置高亮
        this.walkableGrids = player.selectedPiece?.getValidWalkableGrids() ?? [];
        for (let grid of this.walkableGrids) {
            console.warn(`Rerender Walkable Grid ${grid}`);
            this.rerenderGrid(grid.x, grid.y);
        }
        console.warn(`Rerender Selected Grid (${selectedGrid})`);
        this.rerenderGrid(selectedGrid.x, selectedGrid.y);
    }
    public selectClear(previousSelectedGrid: Pos | undefined){
        if (previousSelectedGrid !== undefined)
            this.rerenderGrid(previousSelectedGrid.x, previousSelectedGrid.y);

        for (let grid of this.walkableGrids) {
            console.warn(`Rerender Walkable Grid ${grid} - Clear Effect`);
            this.rerenderGrid(grid.x, grid.y);
        }
        this.walkableGrids = [];
    }


    constructor(game: Game) {
        this.game = game;
        this.rerenderGridMethodsArray = Array(game.board.height);
        for (let i = 0; i < game.board.height; i++) {
            this.rerenderGridMethodsArray[i] = Array(game.board.width);
        }
    }

    rerenderGrid(x: number, y: number){
        console.log(`updateGridsMethodsArray[${y}][${x}] =`);
        //console.log(this.game.renderManager.rerenderGridMethodsArray);
        this.game.renderManager.rerenderGridMethodsArray[y][x]();
    }
}