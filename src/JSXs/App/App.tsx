
import './App.css';

import {Test} from "../Test/Test";
import {GamePanel} from "../Game/GamePanel/GamePanel";
import {Game} from "../../GameLogic/Game";
import {Shogi} from "../../GameLogic/Rules/Shogi";
import {SettingsPanel} from "../Game/SettingsPanel/SettingsPanel";



function App() {

    const game = new Game(new Shogi());


    return (//<div></div>
        <div id="App" className="App">
            <div id="Body">
                <GamePanel game={game}></GamePanel>

            </div>
            <SettingsPanel game={game}/>
            <Test game={game}></Test>
        </div>

    );
}

export default App;
