import {JSX} from "react";
import {GridNumbersJSX} from "./GridNumbersJSX";

import {BoardData} from "../../../Game/GetData/GetData";
import {GridRowJSX} from "./GridRowJSX";


export function map(length: number, func: (i: number) => JSX.Element){
    return Array(length).fill(null).map(
        (_, i) => func(i)
    )
}



export function BoardJSX({boardData, handleClick, rowNoType, columnNoType}:
                          {boardData: BoardData, handleClick: (x: number, y: number) => void
                              rowNoType: string, columnNoType: string}) {

    // function handleClick(x: number, y: number) {
    //     game.board.handleClick(x, y);
    //     setCount(count + 1);
    // }

    let height = boardData.rows.length - 1;

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
                    handleClick = {(x) => {handleClick(x, height - y)}}
                />
                )
            }
            </div>
        </div>
    );

}


