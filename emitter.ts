class EventEmitter<EventsMap extends {} = any> {
    on<Event extends keyof EventsMap>(event: Event, callback: EventsMap[Event]): void {
        // do some stuff
    }

    // @ts-ignore
    event<Event extends keyof EventsMap>(event: Event, args: Parameters<EventsMap[Event]>): void {
        // do some stuff
    }
}

enum Events {
    First = "firstEvent",
    Second = "secondEvent"
}

/**
 * Strongly typed
 */
const typedEventEmitter = new EventEmitter<{
    [Events.First]: (a: number) => void,
    [Events.Second]: () => void,
}>();


// with args
typedEventEmitter.on(Events.First, (a: number) => {
    void a;
});
typedEventEmitter.event(Events.First, [1]);

// without args
typedEventEmitter.on(Events.Second, () => {

});
typedEventEmitter.event(Events.Second, []);

/**
 * Default is not typed
 */
const notTypedEmitter = new EventEmitter();

notTypedEmitter.on("evt", (a: number) => {

});
notTypedEmitter.event("evt", []);