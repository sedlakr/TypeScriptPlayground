class EventEmitter<EventsMap extends {} = any> {
    on<Event extends keyof EventsMap>(...[event, handler]: EventsMap[Event] extends (...args: infer P) => any ? (P extends [] ? [Event, () => void] : [Event, (P) => void]) : never): void {
        // do some stuff
    }

    event<Event extends keyof EventsMap>(...[event, args]: EventsMap[Event] extends (...args: infer P) => any ? (P extends [] ? [Event, void] : [Event, P]) : [Event, void]): void {
        // do some stuff
    }
}

enum Events {
    First = "firstEvent",
    Second = "secondEvent",
    Third = "thirdEvent",
}

/**
 * Strongly typed
 */
const typedEventEmitter = new EventEmitter<{
    [Events.First]: (a: number) => void,
    [Events.Second]: () => void,
    [Events.Third]: (a: string) => void,
}>();


/**
 * First
 */
// with args
typedEventEmitter.on(Events.First, (a: number) => {
    void a;
});
typedEventEmitter.event(Events.First, [1]);
// error
typedEventEmitter.event(Events.First);
typedEventEmitter.event(Events.First, ["b"]);

/**
 * Second
 */
// without args
typedEventEmitter.on(Events.Second, () => {

});
typedEventEmitter.event(Events.Second);

// error
typedEventEmitter.event(Events.Second, ["1"]);

/**
 * Third
 */
typedEventEmitter.event(Events.Third, ["b"]);

// error
typedEventEmitter.event(Events.Third);
typedEventEmitter.event(Events.Third, []);
typedEventEmitter.event(Events.Third, [1]);


/**
 * Default is not typed
 */
const notTypedEmitter = new EventEmitter();

notTypedEmitter.on("evt", (a: number) => {

});
notTypedEmitter.event("evt", []);