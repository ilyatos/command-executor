export interface Command {
    name: string;
    args: Args;
}

export interface Args extends Array<Arg> {
    toFlatArray(): string[]
 }

export type Arg = NamedArg | PositionalArg | FlagArg

export interface NamedArg {
    name: string;
    value: string;
}

export interface PositionalArg {
    value: string;
}

export interface FlagArg {
    name: string;
}
