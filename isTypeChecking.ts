abstract class A {
    abstract count(): number;
}

class B extends A {
    count() {
        return 5;
    }

    add() {

    }
}

class C extends A {
    count() {
        return 6
    }

    sub() {

    }
}

class D extends A {
    count() {
        return 7;
    }

    addD() {
        return 20;
    }
}

const b: B = new B();
const c: C = new C();
const d: D = new D();

//BAD
function func(input: A) {
    if (isB(input)) {
        (input as any as B).add();
        return;
    } else {
        (input as any as C).sub();
    }
}

function isB(input: any): boolean {
    return Boolean(input.add)
}

func(b);
func(c);
func(d);

// GOOD
function isBOK(input: A): input is B {
    return input instanceof B;
}

function funcOK(input: A) {
    if (isBOK(input)) {
        input.add();
    } else {
        input.count()
    }
}

funcOK(b);
funcOK(c);
funcOK(d);