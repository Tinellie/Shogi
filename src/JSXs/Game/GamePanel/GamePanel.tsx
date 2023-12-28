import {BoardJSX} from "../Board/BoardJSX/BoardJSX";
import {Game} from "../../../GameLogic/Game";
import {GetData} from "../../../GameLogic/GetData/GetData";
import {useEffect, useState} from "react";

import './GamePanel.css';
import './GamePanelFonts.css'


export function GamePanel({game}: {game: Game}) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [count, setCount] = useState(0);

    useEffect(()=>{
        game.renderManager.rerenderAllMethod = () => setCount(count => count+1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="Game" className="Game">
            <BoardJSX game={game}
                      boardData={GetData.GetBoardData(game.board)}
                      // handleClick={(x, y, updateGridMethod) => {
                      //       game.board.handleClick(x, y, game.players.current, updateGridMethod)
                      //       setCount(count+1);
                      //   }
                      // }
                      rowNoType="number" columnNoType="chinese"/>
        </div>
    )
}