export interface IGenericKeyValue<V> {
    [key: string]: V;
}

export interface IReducer<S = IGenericKeyValue<any>, A = IGenericKeyValue<any>> {
    (state: S, action: A): S;
}

export interface IReducerCreator<S = IGenericKeyValue<any>, A = IGenericKeyValue<any>> {
    (handlers: IReducerHandlers, initialState?: S): IReducer<S, A>;
}

export interface IReducerHandler<S = IGenericKeyValue<any>, A = IGenericKeyValue<any>> {
    (state: S, action: A): S;
}

export interface IReducerHandlers<S = IGenericKeyValue<any>> {
    [key: string]: IReducerHandler<S>;
    DEFAULT: IReducerHandler<S>;
}

const createReducer: IReducerCreator = (handlers, initialState) => (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};

export default createReducer;
