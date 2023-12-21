import {Settings} from "../../Game/Settings";
import React from "react";

export function SettingsPanel({settings} : {settings: Settings}){
    return <div>
        <input type="checkbox" onInput={
            (event: React.ChangeEvent<HTMLInputElement>) => {
                settings.dontSwitchPlayer = event.target.checked;
                console.warn(`checked: ${settings.dontSwitchPlayer}`)
            }
        }/>
    </div>
}