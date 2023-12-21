import {GridData} from "../../../Game/GetData/GetData";
import {PieceJSX} from "./PieceJSX";

import './Grid.css';
import './GridEffects.css';



export function GridJSX({grid, handleClick}: { grid: GridData, handleClick: () => void }) {
    /*
    1. 格子可以移动, 上面是空格
       => 斜线 + 当前玩家颜色 高亮
    2. 格子被敌方棋子占据, 移到此处会吃掉对方棋子
       => 红色背景高亮
    3. 格子被选中
       => 增加一个框选元件

     */

    return (
        <button
            className={`grid${grid.selectable ? " selectable" : ""}` +
                (grid.currentPlayerDirection === -1 ? " player2" : " player1")}
            onClick={() => handleClick()}
        >
            {(grid.piece != null) ? <PieceJSX piece={grid.piece}/> : null}
        </button>
    )
}