declare module 'looppa' {
    interface CallbackFn<R> {
        (value: any, key: any, index: number): R;
    }
    
    interface FactoryFn<R> {
        (callback: CallbackFn<R>): R[];
    }
    
    type Collection = number | string | object | Map<any, any> | Set<any> | [] ;
    
    function looppa<R>(collection: Collection, to?: number): FactoryFn<R>;
    
    export = looppa;
}
