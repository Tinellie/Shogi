import {JSX} from "react";
import {GridNumbersJSX} from "./GridNumbersJSX";

import {GridRowJSX} from "./GridRowJSX";
import {BoardData} from "../../../Game/GetData/Data";



export function map(length: number, func: (i: number) => JSX.Element){
    return Array(length).fill(null).map(
        (_, i) => func(i)
    )
}



export function BoardJSX({boardData, handleClick, rowNoType, columnNoType}:
                          {boardData:BoardData,
                              handleClick: (x: number, y: number, updateGridMethod: (x: number, y: number)=>void) => void
                              rowNoType: string, columnNoType: string}) {

    // function handleClick(x: number, y: number) {
    //     game.board.handleClick(x, y);
    //     setCount(count + 1);
    // }

    let height = boardData.rows.length - 1;

    const updateGridsMethods: (()=>void)[][] = Array(boardData.height)
    for (let i = 0; i < boardData.height; i++) {
        updateGridsMethods[i] = Array(boardData.width);
    }
    function updateGrid(x: number, y: number){
        updateGridsMethods[y][x]()
    }

    return (
        <div id="game-board">
            <GridNumbersJSX
                width={boardData.size.x} height={boardData.size.y}
                rowNoType={rowNoType} columnNoType={columnNoType}/>
            <div id="game-board-inner">
            {
                map(
                boardData.rows.length, (y) =>
                <GridRowJSX
                    row={boardData.rows[height - y]}
                    y={height - y}
                    handleClick = {
                        (x) => {handleClick(x, height - y, updateGrid)}
                    }
                    updateGridMethods={updateGridsMethods}
                />
                )
            }
            </div>
        </div>
    );

}


