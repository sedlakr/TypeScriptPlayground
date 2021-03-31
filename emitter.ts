declare class EventEmitter<EventsMap extends {} = any> {
    subscribe<Event extends keyof EventsMap>(event: Event, handler: EventsMap[Event]): void;

    event<Event extends keyof EventsMap>(...[event, args]: EventsMap[Event] extends (...args: infer P) => void ? (P extends never[] ? [Event] : [Event, P]) : never): void;

    request<Event extends keyof EventsMap>(...[event, args]: EventsMap[Event] extends (...args: infer P) => any ? (P extends never[] ? [Event] : [Event, P]) : never): EventsMap[Event] extends (...args: infer P) => infer R ? R : never;
}

enum Events {
    First = "firstEvent",
    Second = "secondEvent",
    Third = "thirdEvent",
    Fourth = "fourthEvent",
}

type TEventsMap = {
    [Events.First]: (a: number) => void,
    [Events.Second]: () => void,
    [Events.Third]: (a: string) => void,
    [Events.Fourth]: (a: string) => number,
    [key: string]: (...args: any[]) => void,
};
/**
 * Strongly typed
 */
const typedEventEmitter = new EventEmitter<TEventsMap>();

// OK
typedEventEmitter.event(Events.First, [1]);
typedEventEmitter.event(Events.Second);
typedEventEmitter.event(Events.Third, ["4"]);
typedEventEmitter.subscribe(Events.Fourth, (a: string) => {
    return 1;
});
let result: number = typedEventEmitter.request(Events.Fourth, ["a"]);
void result;
typedEventEmitter.subscribe(Events.First, (a: number) => {
    void a;
});
typedEventEmitter.subscribe(Events.Second, () => {

});
typedEventEmitter.subscribe(Events.Third, (a => {
    void a;
}));

typedEventEmitter.subscribe("someCustomEventNotInMap", (a => {
	void a;
}));


// ERROR
typedEventEmitter.event(Events.First);
typedEventEmitter.event(Events.Second, []);
typedEventEmitter.event(Events.Third);
typedEventEmitter.event(Events.Fourth);
let num: number = typedEventEmitter.request(Events.Second);
typedEventEmitter.subscribe(Events.Fourth, (a: string) => {
    return "a";
});
typedEventEmitter.subscribe(Events.First, (a: string) => {
    void a;
});
typedEventEmitter.event(Events.First, ["b"]);
typedEventEmitter.event(Events.Second, ["1"]);
typedEventEmitter.subscribe(Events.Second, (a: number) => {
});
typedEventEmitter.event(Events.Third, []);
typedEventEmitter.event(Events.Third, [1]);

/**
 * Default is not typed
 */
const notTypedEmitter = new EventEmitter();

notTypedEmitter.subscribe("evt", (a: number) => {

});
notTypedEmitter.event("evt", []);