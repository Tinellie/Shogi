import {PieceData} from "../../../Game/GetData/Data";

import "./PieceJSX.css"

export function PieceJSX({piece}: { piece: PieceData }) {
    return (
        <div className={"piece" + ((piece.direction === -1) ? " player2" : " player1")}>
            <div className="piece-svg-container">
                <svg className="piece-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.41 43.68">
                    <path stroke="#eee" fill="none" className="cls-1"
                          d="M35.91,43.18H2.5c-1.21,0-2.15-1.08-1.98-2.28L5.04,8.08c.14-1.03,.81-1.92,1.77-2.34L18.4,.67c.51-.22,1.09-.22,1.6,0l11.59,5.07c.96,.42,1.63,1.3,1.77,2.34l4.52,32.83c.17,1.2-.77,2.27-1.98,2.27Z"/>
                </svg>
            </div>
            <p className="piece-name">{piece.symbol}</p>
        </div>
    )
}