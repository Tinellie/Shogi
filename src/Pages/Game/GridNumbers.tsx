import {map} from "./BoardPanel";
import * as cn from "chinese-numbering";



export function getLatinLetter(no: number): string {
    let str = (no).toString(26),
        str2 = '';
    str.split('').forEach((e, i) => {
        let code = e.charCodeAt(0) + (isNaN(Number(e)) ? 10 - 33 : 16) + ((i === 0) ? 0 : 1);
        str2 += String.fromCharCode(code);
    })
    return str2;
}


export function GridNumbers({width, height, rowNoType, columnNoType}:
                                {width: number, height: number, rowNoType: string, columnNoType: string}){
    function getNoDivs(length: number, type: string) {
        return map(length, (i) =>
            <div key={i}>
                {
                    (type === "latin")?
                        getLatinLetter(i+1) :
                        (type === "chinese")?
                            cn.numberToChinese(i+1) :
                            (i+1)
                }
            </div>
        )
    }
    return(
        <>
            <div className="row-no">
                {getNoDivs(width, rowNoType)}
            </div>
            <div className="column-no">
                {getNoDivs(height, columnNoType)}
            </div>
        </>
    )


}


