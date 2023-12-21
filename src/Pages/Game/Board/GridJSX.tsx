import {PieceJSX} from "./PieceJSX";

import './GridJSX.css';
import './GridJSXEffects.css';
import {GridData} from "../../../Game/GetData/Data";
import {Pos} from "../../../Game/Pos";
import {useState} from "react";



export function GridJSX({grid, xy, handleClick, updateGridMethods}:
                            { grid: GridData, xy: Pos,
                                handleClick: () => void,
                                updateGridMethods: (()=>void)[][]
                            }) {
    console.log(`--- RERENDER Grid #${xy}`);

    const [count, setCount] = useState(0)

    updateGridMethods[xy.y][xy.x] = () => setCount(count+1);

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
            className={`grid${grid.status ? " selectable" : ""}` +
                (grid.colorOfPlayer === -1 ? " player2" : " player1")}
            onClick={() => handleClick()}
        >
            {(grid.piece != null) ? <PieceJSX piece={grid.piece}/> : null}
        </button>
    )
}