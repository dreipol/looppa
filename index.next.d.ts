declare module 'looppa' {
    
    interface RangeFn<R> {
        (index: number): R;
    }
    
    interface LetterFn<R> {
        (letter: string, index: number): R;
    }
    
    interface ObjectFn<R> {
        (value: any, key: string, index: number): R;
    }
    interface ArrayFn<R, V> {
        (value: V, index: number): R;
    }
    
    function looppa<R>(string: string): (callback: LetterFn<R>) => R[];
    function looppa<R>(start: number, end: number): (callback: RangeFn<R>) => R[];
    function looppa<R, V>(array: V[]): (callback: ArrayFn<R, V>) => R[];
    function looppa<R>(object: object): (callback: ObjectFn<R>) => R[];
    function looppa<R>(map: Map<any, any>): (callback: ObjectFn<R>) => R[];
    function looppa<R, V>(set: Set<any>): (callback: ArrayFn<R, V>) => R[];
    
    export = looppa;
}
