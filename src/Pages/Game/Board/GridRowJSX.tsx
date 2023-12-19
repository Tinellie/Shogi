import {RowData} from "../../../Game/GetData";
import {map} from "./BoardJSX";
import {GridJSX} from "./GridJSX";

export function GridRowJSX({row, handleClick}:
                                 { row: RowData, handleClick: (x: number) => void }) {

    return (
        <div className="board-row">
            {
                map(
                    row.grids.length, (x) =>
                        <GridJSX
                            grid={row.grids[x]}
                            handleClick={() => handleClick(x)}
                        />
                )
            }
        </div>
    )
}