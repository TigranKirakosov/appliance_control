import React from 'react';
import Container from './container';
import { NavLink } from 'react-router-dom';
import { ERoutes } from '../routing';

interface IApplianceCardProps {
    applianceInfo: {
        id: string;
        type: string;
        owner: string;
        ownerName: string;
    },
    onGet(id: string): void;
    onRemove(id: string): void;
    showGet(): boolean;
    showSettings(): boolean;
}

const ApplianceCard: React.FC<IApplianceCardProps> = ({
    applianceInfo: {
        id: applianceId,
        type,
        ownerName
    },
    onGet,
    onRemove,
    showGet,
    showSettings
}) => {
    return (
        <Container p='2' m='.5' border='2'>
            <p>Appliance type: {type}</p>
            <p>Owner name: {ownerName || 'none'}</p>
            {showGet() &&
                <button onClick={() => onGet(applianceId)}>Get appliance</button>}
            {showSettings() && (
                [
                    <button style={{ marginRight: '15px' }} key='1' onClick={() => onRemove(applianceId)}>Remove</button>,
                    <NavLink key='2' to={`${ERoutes.CONTROL}/${applianceId}`}>Go to control panel</NavLink>
                ]
            )}
        </Container>
    );
};

export default ApplianceCard;
