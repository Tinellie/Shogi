import {Game} from "../Game/Game";
import {Pos} from "../Game/Pos";
import {Piece} from "../Game/Piece";
import React, {useRef, useState} from "react";
import {Shogi} from "../Game/Shogi";

import './Test.css';

const defaultX = 7;
const defaultY = 6;
function Func(g: Game, pos: Pos | null | undefined){
    let grids: Pos[] = [];
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


export function Test({game} : {game: Game}) {

    console.warn("Test() Start");

    const [currentPlayer, setPlayer] = useState(0);
    const [X, setX] = useState(defaultX);
    const [Y, setY] = useState(defaultY);
    const [update, setUpdate] = useState(0);
    const isMounted = useRef(false);

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

    console.warn("Test() Mid");


    console.warn(`${game}`)
    console.warn(`${game.board}`)
    console.log(game.board);
    let r = Func(game, new Pos(defaultX, defaultY));
    console.log(game.board);
    console.warn(`piece ${r[0]}, walkable Grids: ${"\n" + r[1]}`);

    //const [Content, setContent] = useState(r);
    let content: string[] = [];
    let selectedPiece = game.players.list[currentPlayer].selectedPiece;
    content = Func(game, selectedPiece?.pos);

    console.warn("Test() End");


    return (
        <div className="Test">
            <div>
                {`${game.board.getValidWalkableGrids(game.board.g(X, Y).piece)}`}
            </div>
            <div>
                {`X: ${X}, Y: ${Y}`}
            </div>
            <div>{content.map((v) => <p>{v}</p>)}</div>
            <div>
                player: <br/><input id="currentPlayer" onChange={e => setPlayer(parseInt(e.target.value)%2)}/>
                <br/>x<input id="inputX" onChange={e => setX(parseInt(e.target.value))}/>
                <br/>y<input id="inputY" onChange={e => setY(parseInt(e.target.value))}/>
                <br/><button onClick={()=>{game.board.handleClick(X, Y, game.players.list[currentPlayer]); setUpdate(update+1)}}>Click</button>
            </div>

            <div id="PlayerData">
                {
                    game.players._getData().map(
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
        </div>
    );
}