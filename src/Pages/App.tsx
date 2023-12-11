
import './App.css';

import {Test} from "./Test";
import {GamePanel} from "./Game/GamePanel";
import {useState} from "react";
import {Game} from "../Game/Game";
import {Shogi} from "../Game/Shogi";
import {SettingsPanel} from "./Game/SettingsPanel";



function App() {

    const [game, setGame] = useState(new Game(new Shogi()));


    return (//<div></div>
        <div id="App" className="App">
            <div>a</div>
            <div id="Body">
                <GamePanel game={game}></GamePanel>

            </div>
            <SettingsPanel settings={game.settings}/>
            <Test game={game}></Test>
        </div>

    );
}

export default App;
