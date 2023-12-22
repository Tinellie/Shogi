import {map} from "./BoardJSX";
import {GridJSX} from "./GridJSX";
import {RowData} from "../../../Game/GetData/Data";
import {Pos} from "../../../Game/Pos";

export function GridRowJSX({row, y, handleClick, updateGridMethods}:
                                 { row: RowData, y: number,
                                     handleClick: (x: number) => void,
                                     updateGridMethods: (()=>void)[][]
                                 }) {
    //console.log(`- RERENDER Grid Row #${y}`);


    return (
        <div className="board-row">
            {
                map(
                    row.grids.length, (x) =>
                        <GridJSX
                            grid={row.grids[x]}
                            xy={new Pos(x, y)}
                            handleClick={() => handleClick(x)}
                            updateGridMethods={updateGridMethods}
                        />
                )
            }
        </div>
    )
}