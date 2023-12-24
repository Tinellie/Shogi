import {PieceJSX} from "./PieceJSX";

import './GridJSX.css';
import './GridJSXEffects.css';
import {GridStatus} from "../../../Game/GetData/Data";
import {v} from "../../../Game/Pos";
import {useEffect, useState} from "react";
import {GetData} from "../../../Game/GetData/GetData";
import {Game} from "../../../Game/Game";



export function GridJSX({game, x, y, /*handleClick,*/ updateGridMethodsArray}:
                            { game: Game, x: number, y: number,
                                //handleClick: () => void,
                                updateGridMethodsArray: (()=>void)[][],
                            }) {
    let grid = GetData.GetGridData(game, x, y)


    const [count, setCount] = useState(0);

    console.log(`--- RERENDER Grid #(${x}, ${y}), count: ${count}, status: ${grid.status.toString()}, classname=${`grid ${
        v(grid.status).is([GridStatus.movable, GridStatus.movableCaptureble]) ? "selectable" : ""
    } ${
        (grid.colorOfPlayer === -1 ? "player2" : "player1")
    }`.trimEnd()}`);



    useEffect(()=>{
        updateGridMethodsArray[y][x] = () => {
            setCount(count => count+1);
            console.log(`count: ${count}`)
        }
        // eslint-disable-next-line
    }, [])

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
            className={`g${x}-${y} ` +
                `grid ${
                    v(grid.status).is([GridStatus.movable, GridStatus.movableCaptureble]) ? "selectable" : ""
                } ${
                    (grid.colorOfPlayer === -1 ? "player2" : "player1")
                }`.trimEnd()
            }
            onClick={() => {
                game.board.handleClick(x, y, game.players.current)
            }}
        >
            {(grid.piece != null) ? <PieceJSX piece={grid.piece}/> : null}
        </button>
    )
}