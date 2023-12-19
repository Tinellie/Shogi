import {GridData} from "../../../Game/GetData";

import {PieceJSX} from "./PieceJSX";

export function GridJSX({grid, handleClick}: { grid: GridData, handleClick: () => void }) {

    return (
        <button
            className={`grid${grid.selectable ? " selectable" : ""}` +
                (grid.currentPlayerDirection === -1 ? " inverse" : " direct")}
            onClick={() => handleClick()}
        >
            {(grid.piece != null) ? <PieceJSX piece={grid.piece}/> : null}
        </button>
    )
}