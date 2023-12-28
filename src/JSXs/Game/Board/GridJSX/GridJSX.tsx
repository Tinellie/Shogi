import {PieceJSX} from "../PieceJSX/PieceJSX";
import {GridStatus} from "../../../../GameLogic/GetData/Data";
import {v} from "../../../../GameLogic/Pos";
import {useEffect, useState} from "react";
import {GetData} from "../../../../GameLogic/GetData/GetData";
import {Game} from "../../../../GameLogic/Game";


import './GridJSX.css';
import './GridJSXEffects.css';
import './GridJSXSelectable.css';
import './GridJSXSelected.css';


export function GridJSX({game, x, y, /*handleClick,*/ updateGridMethodsArray}:
                            { game: Game, x: number, y: number,
                                //handleClick: () => void,
                                updateGridMethodsArray: (()=>void)[][],
                            }) {
    let grid = GetData.GetGridData(game, x, y)


    const [count, setCount] = useState(0);

    console.log(`--- RERENDER Grid #(${x}, ${y}), count: ${count}, status: ${grid.status.toString()}, classname=${`grid ${
        v(grid.status).is([GridStatus.movable, GridStatus.movableCapturable]) ? "selectable" : ""
    } ${
        (grid.currentPlayer === -1 ? "player2" : "player1")
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

    let className: string = `g${x}-${y} grid`;

    if (grid.status === GridStatus.movable || grid.status === GridStatus.movableCapturable) {
        className += " movable"
        if (grid.status === GridStatus.movableCapturable) {
            className += "-capturable"
        }
        className += " " + (grid.currentPlayer === -1 ? "by-player2" : "by-player1");
    } else if (grid.status === GridStatus.selected) {
        className += " selected"
    }


    return (
        <button
            className={className}
            onClick={() => game.board.handleClick(x, y, game.players.current)}
            // onMouseDown={}
        >
            {(grid.piece != null) ? <PieceJSX piece={grid.piece}/> : null}
            <div className="effects">
                {(grid.status === GridStatus.selected) ? <div className="selected-effect">
                    <div></div> <div></div> <div></div> <div></div>
                </div> : null}
                {(grid.status === GridStatus.movable || grid.status === GridStatus.movableCapturable) ?
                    <div className="movable-effect"></div> : null}
                <div className="hover-effect"></div>
            </div>
        </button>
    )
}