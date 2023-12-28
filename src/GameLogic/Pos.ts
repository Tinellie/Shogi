

export function v<T>(v1: T) {

    return {
        inRange: (min: number, max: number) => {
            if (min > max) {
                [min, max] = [max, min];
            }
            return min <= v1 && v1 <= max;
        },
        is: (vs: T[]) => {
            for (const v2 of vs) {
                if (v2 === v1) return true;
            }
            return false;
        }
    }
}

export class Pos {

    x: number; y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x; this.y = y;
    }


    toString(){
        return `(${this.x}, ${this.y})`
    }

    equal(x: number, y: number): boolean {
        return x === this.x && y === this.y;
    }

    get decompose() {
        return [this.x, this.y];
    }

    get clone(): Pos {
        return new Pos(this.x, this.y);
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