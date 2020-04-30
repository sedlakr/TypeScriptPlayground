type TmodernE = {
    a: () => void
};

class A {

    get modernE(): TmodernE {
        if (!this._modernE) {
            throw new Error("moderne not defined, load must be called before");
        }
        return this._modernE;
    }

    private _modernE: TmodernE | undefined;

    constructor() {

    }

    async load() {
        //
        this._modernE = {
            a: () => {
                console.log("test");
            }
        }
    }

    a() {
        this.modernE.a();
    }

    b() {
        if (!this.modernE) {
            throw new Error("moderne not defined, load must be called before");
        }
        console.log("b");
        this.modernE.a();
    }

}

const a = new A();
a.a();