
import './App.css';

import {Test} from "./Test";
import {GamePanel} from "./Game/GamePanel";
import {useState} from "react";
import {Game} from "../Game/Game";
import {Shogi} from "../Game/Shogi";



function App() {

    const [game, setGame] = useState(new Game(new Shogi()));


    return (//<div></div>
      <div id="App" className="App">
        <GamePanel game={game}></GamePanel>
        <Test game={game}></Test>
      </div>

    );
}

export default App;
