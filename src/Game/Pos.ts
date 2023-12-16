export class Pos {

    x: number; y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x; this.y = y;
    }


    toString(){
        return `(${this.x}, ${this.y})`
    }

    get area(): number { return this.x * this.y; }


    static p(y: number, x: number) : Pos { return new Pos(x, y); }

    static array(posArray: number[][]) : Pos[] {
        return posArray.map(
            (pos: number[]) =>
                Pos.p(pos[0], pos[1])
        )
    }

    //static sq(size: number) : Pos { return new Pos(size, size); }
}