import {map} from "./Board/BoardJSX";

import {CapturedPieceData} from "../../Game/GetData/Data";


export function CapturedPiecePanel({capturedPieceData} : {capturedPieceData: CapturedPieceData}){
    return (<div className="board-row">
        {
            map(
                capturedPieceData.pieces.length, (x) =>
                    <></>/*<GridJSX
                        grid = {new GridData(false, capturedPieceData.pieces[x].pieceData, 0)}
                        xy = {new Pos(-1, -1)}
                        handleClick = {() => {}}
                    />*/
            )
        }
    </div>)
}