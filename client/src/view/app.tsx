import React, { useLayoutEffect } from 'react';
import Routing from '../view/routing';
import Services from '../api/rest/services';
import store from '../state/store';

const App: React.FC = () => {
    useLayoutEffect(() => {
        Services.Auth.authenticate()
            .then((user) => store.dispatch({ type: 'SET_USER', payload: user }))
            .catch((error) => console.log('Auth failed: ', error.message));
    }, []);
    return (
        <Routing />
    );
};

export default App;
