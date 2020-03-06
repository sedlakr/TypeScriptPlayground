interface MyMap {
    mapItem: () => void;
}

type NotEmptyParameters<T> = T extends (...args: infer P) => any ? (P extends [] ? void : P) : never;

class TestVoid {
    // #works OK
    voidMethodInstA<Key extends keyof MyMap>(a: Key, b: void) {
    }
    // #dosn't work
    voidMethodInstB<Key extends keyof MyMap>(a: Key, b: NotEmptyParameters<MyMap[Key]>) {
    }
}

const a = new TestVoid();
a.voidMethodInstA("mapItem");
a.voidMethodInstB("mapItem");
