import React, {JSX, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import * as cn from "chinese-numbering";
import {Pawn, Piece} from "./Game/Piece";
import {Game} from "./Game/Game";
import {Shogi} from "./Game/Shogi";
import {Player} from "./Game/Player";



const defaultX = 7;
const defaultY = 6;
function Func(g: Game, x: number, y: number){
  let piece = g.board.g(x, y).piece as Piece;
  let grids = g.board.getValidWalkableGrids(piece);
  let results: string[] = [piece?.name, "____ [0] [1] [2] [3] [4] [5] [6] [7] [8]"];

  for (let iy = 9 - 1; iy >= 0; iy--) {
    let result = `(${iy})  |`
    for (let ix = 0; ix < 9; ix++) {
      result += (ix === x && iy === y) ? " # ":
          (grids.find((pos) => pos.x === ix && pos.y === iy))?
              (g.board.grids[iy][ix].piece !== null) ? `[${g.board.grids[iy][ix].piece?.symbol}]` : " ● ":
              (g.board.grids[iy][ix].piece !== null) ? ` ${g.board.grids[iy][ix].piece?.symbol} ` : " _ ";
      result += "|"
    }
    results[results.length] = result;
  }
  return results;
}

function App() {
  let p = new Pawn();
  Game.players.list[0] = new Player(1);
  Game.players.list[1] = new Player(-1);
  const g = new Game(new Shogi());
  console.warn(`${g.board}`)
  console.log(g.board);


  let r = Func(g, defaultX, defaultY);
  console.log(g.board);
  console.warn(`piece ${r[0]}, walkable Grids: ${"\n" + r[1]}`);

  const [X, setX] = useState(defaultX)
  const [Y, setY] = useState(defaultY)
  //const [Content, setContent] = useState(r);
  let Content: string[] = [];
  if(X !== null && Y !== null) Content = Func(g, X, Y);

  return (
      <>
        <div className="App">
          {`${g.board.getValidWalkableGrids(g.board.g(X, Y).piece)}`}
        </div>
        <div>{Content.map((v) => <p>{v}</p>)}</div>
        <input id="inputX" onChange={e => setX(parseInt(e.target.value))}/>
        <input id="inputY" onChange={e => setY(parseInt(e.target.value))}/>
        {/*<button onClick={()=>setContent(Func(g, X, Y))}>Update</button>*/}
      </>
  );
}

export default App;
