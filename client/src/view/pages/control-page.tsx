import React from 'react';
import { Route } from 'react-router-dom';
import ApplianceSettings from '../components/appliance-settings';
import { ERoutes } from '../routing';

const ControlPage: React.FC = () => {
    return (
        <div>
            <h1>Control panel</h1>
            <Route path={`${ERoutes.CONTROL}/:id`}>
                <ApplianceSettings />
            </Route>
        </div>
    );
};

export default ControlPage;
