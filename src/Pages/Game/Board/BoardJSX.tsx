import React, {JSX} from "react";
import {GridNumbersJSX} from "./GridNumbersJSX";

import {GridRowJSX} from "./GridRowJSX";
import {BoardData} from "../../../Game/GetData/Data";
import {Game} from "../../../Game/Game";



export function map(length: number, func: (i: number) => JSX.Element){
    return Array(length).fill(null).map(
        (_, i) => func(i)
    )
}



export function BoardJSX({game, boardData, /*handleClick,*/ rowNoType, columnNoType}:
                          {game: Game, boardData: BoardData,
                              //handleClick: (x: number, y: number, updateGridMethod: (x: number, y: number)=>void) => void
                              rowNoType: string, columnNoType: string}) {
    console.log(`RERENDER BoardJSX`)
    // function handleClick(x: number, y: number) {
    //     game.board.handleClick(x, y);
    //     setCount(count + 1);
    // }

    let height = boardData.height - 1;




    return (
        <div id="game-board">
            <GridNumbersJSX
                width={boardData.size.x} height={boardData.size.y}
                rowNoType={rowNoType} columnNoType={columnNoType}/>
            <div id="game-board-inner">
            {
                map(
                boardData.height, (y) =>
                <GridRowJSX
                    game={game}
                    y={height - y}
                    // handleClick = {
                    //     (x) => {handleClick(x, height - y, updateGrid)}
                    // }
                    updateGridMethodsArray={game.renderManager.rerenderGridMethodsArray}
                />
                )
            }
            </div>
        </div>
    );

}


