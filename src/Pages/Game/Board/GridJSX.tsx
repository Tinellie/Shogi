import {PieceJSX} from "./PieceJSX";

import './GridJSX.css';
import './GridJSXEffects.css';
import {GridStatus} from "../../../Game/GetData/Data";
import {v} from "../../../Game/Pos";
import {useState} from "react";
import {GetData} from "../../../Game/GetData/GetData";
import {Game} from "../../../Game/Game";



export function GridJSX({game, x, y, handleClick, updateGridMethods}:
                            { game: Game, x: number, y: number,
                                handleClick: () => void,
                                updateGridMethods: (()=>void)[][]
                            }) {
    //console.log(`--- RERENDER Grid #${xy}`);

    const [count, setCount] = useState(0)

    updateGridMethods[y][x] = () => setCount(count+1);

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

    let grid = GetData.GetGridData(game, x, y)

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