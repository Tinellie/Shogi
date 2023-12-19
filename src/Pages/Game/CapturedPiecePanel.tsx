import {map} from "./Board/BoardJSX";
import {CapturedPieceData, GridData} from "../../Game/GetData";

import {GridJSX} from "./Board/GridJSX";


export function CapturedPiecePanel({capturedPieceData} : {capturedPieceData: CapturedPieceData}){
    return (<div className="board-row">
        {
            map(
                capturedPieceData.pieces.length, (x) =>
                    <GridJSX
                        grid = {new GridData(false, capturedPieceData.pieces[x].pieceData, 0)}
                        handleClick = {() => {}}
                    />
            )
        }
    </div>)
}