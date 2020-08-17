import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';
import createReducer, { IReducerHandlers } from './reducer';
import { IAppliance } from '../models/appliance.model';
import { IUser } from '../models/user.model';

interface IState {
    user: IUser;
    appliances: IAppliance[];
}

const initialState: IState = {
    user: {
        email: null,
        id: null,
        nickName: null
    },
    appliances: []
};

const handlers: IReducerHandlers<IState> = {
    FETCH_APPLIANCES: (state, { payload }) => ({
        ...state,
        appliances: payload
    }),
    ADD_APPLIANCE: (state, { payload }) => ({
        ...state,
        appliances: [ ...state.appliances, payload ]
    }),
    SET_USER: (state, { payload }) => ({
        ...state, user: payload
    }),
    DEFAULT: state => state
};

const commonReducer = createReducer(handlers, initialState);

export const createStore = (rootReducer) => {
    const subject$ = new BehaviorSubject(initialState);

    const store$ = subject$.pipe(
        scan(rootReducer, undefined)
    );

    return ({
        storage$: store$,
        dispatch: action => subject$.next(action),
        getValue: () => subject$.getValue()
    });
};

const store = createStore(commonReducer);

const logger = (state) => console.log('Current state: ', state);
store.storage$.subscribe(logger);

export default store;
