import React, { useState, useLayoutEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { ERoutes } from '../routing';
import store from '../../state/store';
import Services, { restService } from '../../api/rest/services';
import LocalStorageService from '../../utils/local-storage.service';

const Navbar: React.FC = () => {
    const styles = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0 33vw'
    };
    const [toHome, setToHome] = useState(false);
    const [{ user }, setState] = useState(store.getValue());

    useLayoutEffect(() => {
        const subscription = store.storage$.subscribe(setState);
        Services.Appliance.getAppliancesList()
            .then(data => store.dispatch({ type: 'FETCH_APPLIANCES', payload: data }))
            .catch(error => console.error(error));
        return () => subscription.unsubscribe();
    }, []);
    const onLogout = (e) => {
        e.preventDefault();

        LocalStorageService.setAuthTokenToLS('');
        restService.setGlobalAuthToken('');
        store.dispatch({ type: 'SET_USER', payload: { id: null, nickName: null, email: null } })

        setToHome(state => !state);
        // Reset trigger
        setTimeout(() => setToHome(state => !state));
    };
    return (
        <div style={styles}>
            {toHome && <Redirect to={ERoutes.HOME} />}
            <NavLink to={ERoutes.HOME}>Home page</NavLink>
            {user && !user.id && [
                <NavLink key='1' to={ERoutes.REGISTER}>Register</NavLink>,
                <NavLink key='2' to={ERoutes.LOGIN}>Login</NavLink>
            ]}
            {user && user.id && <button onClick={onLogout}>Logout</button>}
        </div>
    )
};

export default Navbar;
