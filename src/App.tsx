import React, {JSX, useEffect, useLayoutEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import * as cn from "chinese-numbering";
import {Pawn, Piece} from "./Game/Piece";
import {Game} from "./Game/Game";
import {Shogi} from "./Game/Shogi";
import {Player} from "./Game/Player";
import {P} from "./Game/Game"



const defaultX = 7;
const defaultY = 6;
function Func(g: Game, pos: P | null | undefined){
  let grids: P[] = [];
  let piece: Piece | null = null;
  if(pos !== null && pos !== undefined){
    piece = g.board.p(pos).piece as Piece;
    grids = g.board.getValidWalkableGrids(piece);
  }
  let results: string[] = [piece?.name ?? "/", "____ [0] [1] [2] [3] [4] [5] [6] [7] [8]"];

  for (let iy = 9 - 1; iy >= 0; iy--) {
    let result = `(${iy})  |`
    for (let ix = 0; ix < 9; ix++) {
      let sym = ()=>g.board.grids[iy][ix].piece?.symbol;
      result += (ix === pos?.x && iy === pos?.y) ? `[${sym()??" "}]`:
          (grids.find((pos) => pos.x === ix && pos.y === iy))?
              (g.board.grids[iy][ix].piece !== null) ? `(${sym()})` : " ● ":
              (g.board.grids[iy][ix].piece !== null) ? ` ${sym()} ` : " _ ";
      result += "|"
    }
    results[results.length] = result;
  }
  return results;
}

var g;

function App() {

  console.warn("App() Start");

  const [currentPlayer, setPlayer] = useState(0);
  const [X, setX] = useState(defaultX);
  const [Y, setY] = useState(defaultY);
  const [update, setUpdate] = useState(0);
  const isMounted = useRef(false);
  const [g, setG] = useState(new Game(new Shogi()));

  // if (!isMounted.current) {
  //   g.current = new Game(new Shogi());
  //
  //   console.warn(`${g}`)
  //   console.warn(`${g.board}`)
  //   console.log(g.board);
  // }
  // useLayoutEffect(()=>{
  //   isMounted.current = true;
  // }, []);
  let paw = new Pawn();

  console.warn("App() Mid");


  console.warn(`${g}`)
  console.warn(`${g.board}`)
  console.log(g.board);
  let r = Func(g, new P(defaultX, defaultY));
  console.log(g.board);
  console.warn(`piece ${r[0]}, walkable Grids: ${"\n" + r[1]}`);

  //const [Content, setContent] = useState(r);
  let content: string[] = [];
  let selectedPiece = g.players.list[currentPlayer].selectedPiece;
  content = Func(g, selectedPiece?.pos);

  console.warn("App() End");


  return (
      <>
        <div className="App">
          {`${g.board.getValidWalkableGrids(g.board.g(X, Y).piece)}`}
        </div>
        <div>
          {`X: ${X}, Y: ${Y}`}
        </div>
        <div>{content.map((v) => <p>{v}</p>)}</div>
        player: <input id="currentPlayer" onChange={e => setPlayer(parseInt(e.target.value)%2)}/><br/>
        x<input id="inputX" onChange={e => setX(parseInt(e.target.value))}/>
        y<input id="inputY" onChange={e => setY(parseInt(e.target.value))}/>
        <button onClick={()=>{g.board.handleClick(X, Y, g.players.list[currentPlayer]); setUpdate(update+1)}}>Click</button>
        <div>
          {
            g.players._getData().map(
              (data, index) =>
                <>
                  <h2>{`player #${index}`}</h2>
                  <div>
                    {data.map((data2) => <p>{data2}</p>)}
                  </div>
                  <br/>
                </>
            )
          }
        </div>
      </>
  );
}

export default App;
