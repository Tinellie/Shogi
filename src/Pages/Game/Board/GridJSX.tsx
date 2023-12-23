import {PieceJSX} from "./PieceJSX";

import './GridJSX.css';
import './GridJSXEffects.css';
import {GridData, GridStatus} from "../../../Game/GetData/Data";
import {Pos, v} from "../../../Game/Pos";
import {useState} from "react";



export function GridJSX({grid, xy, handleClick, updateGridMethods}:
                            { grid: GridData, xy: Pos,
                                handleClick: () => void,
                                updateGridMethods: (()=>void)[][]
                            }) {
    //console.log(`--- RERENDER Grid #${xy}`);

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

    // if(grid.status != 0){
    //     console.warn(v(grid.status).is([GridStatus.movable, GridStatus.movableCaptureble]));
    //     console.warn(`grid.status: ${grid.status}`);
    // }
    // else console.log(`grid.status: ${grid.status}`)
    return (
        <button
            className={
                `grid ${
                    v(grid.status).is([GridStatus.movable, GridStatus.movableCaptureble]) ? "selectable" : ""
                } ${
                    (grid.colorOfPlayer === -1 ? "player2" : "player1")
                }`.trimEnd()
            }
            onClick={() => handleClick()}
        >
            {(grid.piece != null) ? <PieceJSX piece={grid.piece}/> : null}
        </button>
    )
}