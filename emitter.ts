declare class EventEmitter<EventsMap extends {} = any> {
    on<Event extends keyof EventsMap>(event: Event, handler: EventsMap[Event]): void;

    event<Event extends keyof EventsMap>(...[event, args]: EventsMap[Event] extends (...args: infer P) => void ? (P extends never[] ? [Event] : [Event, P]) : never): void;
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

// OK
typedEventEmitter.event(Events.First, [1]);
typedEventEmitter.event(Events.Second);
typedEventEmitter.event(Events.Third, ["4"]);
typedEventEmitter.on(Events.First, (a: number) => {
    void a;
});
typedEventEmitter.on(Events.Second, () => {

});
typedEventEmitter.on(Events.Third, (a => {
    void a;
}));


// ERROR
typedEventEmitter.event(Events.First);
typedEventEmitter.event(Events.Second, []);
typedEventEmitter.event(Events.Third);

typedEventEmitter.on(Events.First, (a: string) => {
    void a;
});
typedEventEmitter.event(Events.First, ["b"]);
typedEventEmitter.event(Events.Second, ["1"]);
typedEventEmitter.on(Events.Second, (a: number) => {
});
typedEventEmitter.event(Events.Third, []);
typedEventEmitter.event(Events.Third, [1]);

/**
 * Default is not typed
 */
const notTypedEmitter = new EventEmitter();

notTypedEmitter.on("evt", (a: number) => {

});
notTypedEmitter.event("evt", []);