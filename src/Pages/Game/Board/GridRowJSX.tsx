import {map} from "./BoardJSX";
import {GridJSX} from "./GridJSX";
import {Game} from "../../../Game/Game";

export function GridRowJSX({game, y, handleClick, updateGridMethods}:
                                 { game: Game, y: number,
                                     handleClick: (x: number) => void,
                                     updateGridMethods: (()=>void)[][]
                                 }) {
    //console.log(`- RERENDER Grid Row #${y}`);


    return (
        <div className="board-row">
            {
                map(
                    game.board.width, (x) =>
                        <GridJSX
                            game={game}
                            x={x} y={y}
                            handleClick={() => handleClick(x)}
                            updateGridMethods={updateGridMethods}
                        />
                )
            }
        </div>
    )
}