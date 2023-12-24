
import './App.css';

import {Test} from "./Test";
import {GamePanel} from "./Game/GamePanel";
import {Game} from "../Game/Game";
import {Shogi} from "../Game/Rules/Shogi";
import {SettingsPanel} from "./Game/SettingsPanel";



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
