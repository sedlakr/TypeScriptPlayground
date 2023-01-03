type TIcon = {aaa:string} & { __a: never };
type TIcon2 = {} & { __b: never };

let a: TIcon = {aaa: "adfa"} as TIcon;
let b: TIcon2 = {} as TIcon2;

// @ts-expect-error
let c: TIcon = b;
// @ts-expect-error
let d: TIcon2 = a;


interface IDataInternal {
    propA: string;
    propB?: number;
}
interface IIcon{
    icon: TIcon; 
    iconCentered?: never;
}
interface IIconCentered{
    iconCentered: TIcon2;
    icon?: never;
}
export type IData = (IDataInternal & IIcon) | (IDataInternal & IIconCentered);


let data1: IData = {
    propA: "a",
    icon: a
} satisfies IData;

// simulate usage
void data1;

let data2: IData = {
    propA: "a",
    iconCentered: b,

} satisfies IData;

// simulate usage
void data2;

// @ts-expect-error
let data3: IData = {
    propA: "a",
    iconCentered: b,
    icon: a,
// @ts-expect-error
} satisfies IData;

// simulate usage
void data3;
