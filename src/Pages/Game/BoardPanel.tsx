import {JSX, useState} from "react";
import {Game} from "../../Game/Game";
//import {boardPanel, Grid} from "../../Game/boardPanel";
import {GridNumbers} from "./GridNumbers";

import {PieceData, GridData, RowData, BoardData} from "../../Game/GetData";


export function map(length: number, func: (i: number) => JSX.Element){
    return Array(length).fill(null).map(
        (_, i) => func(i)
    )
}



export function BoardPanel({boardData, handleClick, rowNoType, columnNoType}:
                          {boardData: BoardData, handleClick: (x: number, y: number) => void
                              rowNoType: string, columnNoType: string}) {




    // function handleClick(x: number, y: number) {
    //     game.board.handleClick(x, y);
    //     setCount(count + 1);
    // }

    let height = boardData.rows.length - 1;

    return (
        <div id="game-board">
            <GridNumbers
                width={boardData.size.x} height={boardData.size.y}
                rowNoType={rowNoType} columnNoType={columnNoType}/>
            <div id="game-board-inner">
            {
                map(
                boardData.rows.length, (y) =>
                <GridRow
                    row={boardData.rows[height - y]}
                    handleClick = {(x) => {handleClick(x, height - y)}}
                />
                )
            }
            </div>
        </div>
    );

}

export function GridRow({row, handleClick}:
                     {row: RowData, handleClick: (x: number) => void}){

    return (
        <div className="board-row">
            {
                map(
                    row.grids.length, (x) =>
                    <Grid
                        grid = {row.grids[x]}
                        handleClick = {() => handleClick(x)}
                    />
                )
            }
        </div>
    )
}

export function Grid({grid, handleClick}: {grid: GridData, handleClick: ()=>void}){

    return (
        <button
            className={`grid${grid.selectable? " selectable" : ""}` +
                (grid.currentPlayerDirection === -1 ? " inverse" : " direct")}
            onClick={() => handleClick() }
        >
            { (grid.piece != null) ? <Piece piece={grid.piece}/> : null }
        </button>
    )
}


function Piece({piece}: {piece: PieceData}) {
    return (
        <div className={"piece" + ((piece.direction === -1) ? " inverse" : " direct")}>
            { (piece)?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.41 43.68">
                    <path stroke="#eee" fill="none" className="cls-1" d="M35.91,43.18H2.5c-1.21,0-2.15-1.08-1.98-2.28L5.04,8.08c.14-1.03,.81-1.92,1.77-2.34L18.4,.67c.51-.22,1.09-.22,1.6,0l11.59,5.07c.96,.42,1.63,1.3,1.77,2.34l4.52,32.83c.17,1.2-.77,2.27-1.98,2.27Z"/>
                </svg> :
                null
            }
            <p>{piece.symbol}</p>
        </div>
    )
}