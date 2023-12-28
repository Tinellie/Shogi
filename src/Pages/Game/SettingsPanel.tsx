import React from "react";
import {Game} from "../../Game/Game";

import "./SettingsPanel.css"

export function SettingsPanel({game} : {game: Game}){
    let settings = game.settings;
    return <div id="settings-panel">
        <div id="settings-dont-switch-player" className="sans-font">
            Dont Switch Player:
            <input type="checkbox" onInput={
                (event: React.ChangeEvent<HTMLInputElement>) => {
                    settings.dontSwitchPlayer = event.target.checked;
                    console.warn(`checked: ${settings.dontSwitchPlayer}`)
                }
            }/>
        </div>
        <button id="settings-rerender-all-button" className="sans-font" onClick={() =>{
            game.renderManager.rerenderAll();
        }}>ForceUpdate</button>
    </div>
}