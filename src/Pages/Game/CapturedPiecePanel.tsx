import {map} from "./BoardPanel";
import {CapturedPieceData, GridData} from "../../Game/GetData";
import {Grid} from "./BoardPanel";


export function CapturedPiecePanel({capturedPieceData} : {capturedPieceData: CapturedPieceData}){
    return (<div className="board-row">
        {
            map(
                capturedPieceData.pieces.length, (x) =>
                    <Grid
                        grid = {new GridData(false, capturedPieceData.pieces[x].pieceData, 0)}
                        handleClick = {() => {}}
                    />
            )
        }
    </div>)
}