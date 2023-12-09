import {BoardPanel} from "./BoardPanel";
import {Game} from "../../Game/Game";
import {GetData} from "../../Game/GetData";
import {useState} from "react";
import {Shogi} from "../../Game/Shogi";

import './GamePanel.css';


export function GamePanel({game}: {game: Game}) {

    const [count, setCount] = useState(0);


    return (
        <div id="Game" className="Game">
            <BoardPanel boardData={GetData.GetBoardData(game, game.board)}
                        handleClick={(x, y) => {
                            game.board.handleClick(x, y, game.currentPlayer)
                            setCount(count+1);
                        }
                        }/>
        </div>
    )
}