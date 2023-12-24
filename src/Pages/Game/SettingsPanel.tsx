import React from "react";
import {Game} from "../../Game/Game";

export function SettingsPanel({game} : {game: Game}){
    let settings = game.settings;
    return <div>
        <input type="checkbox" onInput={
            (event: React.ChangeEvent<HTMLInputElement>) => {
                settings.dontSwitchPlayer = event.target.checked;
                console.warn(`checked: ${settings.dontSwitchPlayer}`)
            }
        }/>
        <button className="sans-font" onClick={() =>{
            game.renderManager.rerenderAll();
        }}>ForceUpdate</button>
    </div>
}