import {BoardJSX} from "./Board/BoardJSX";
import {Game} from "../../Game/Game";
import {GetData} from "../../Game/GetData/GetData";
import {useState} from "react";

import './GamePanel.css';
import './GamePanelFonts.css'


export function GamePanel({game}: {game: Game}) {

    const [count, setCount] = useState(0);


    return (
        <div id="Game" className="Game">
            <BoardJSX boardData={GetData.GetBoardData(game, game.board)}
                      handleClick={(x, y, updateGridMethod) => {
                            game.board.handleClick(x, y, game.players.current, updateGridMethod)
                            setCount(count+1);
                        }
                        }
                      rowNoType="number" columnNoType="chinese"/>
        </div>
    )
}