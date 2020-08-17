import React, { useState, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from './container';
import useApplianceWS from '../../api/ws/appliance/useApplianceWS';
import { IWSApplianceResponse } from '../../api/ws/appliance/interfaces';
import { IWSChannels, IWSNotification } from '../../api/ws/interfaces';

const ApplianceSettings: React.FC = () => {
    const { id } = useParams();
    const [isOn, setIsOn] = useState<boolean>(false);
    const [response, setWsMessages] = useState<IWSApplianceResponse>({
        reqState: IWSNotification.PROCESSING,
        appliance: {
            state: {
                isOn: false,
                startDelay: null,
                workDuration: null
            },
            type: null,
            _id: null,
            owner: null,
            ownerName: null
        }
    });
    const { appliance, reqState } = response || {};
    const { ownerName, state, type } = appliance || {};

    const refObj = useRef();
    const ws$ = useApplianceWS([setWsMessages], refObj);

    useLayoutEffect(() => {
        if (ws$) {
            ws$.current.next({ data: { channel: IWSChannels.DEFAULT, data: { applianceId: id } } });
        }
    }, [ws$]);

    const toggleOnOff = () => {
        setIsOn(state => {
            ws$.current.next({ data: { channel: IWSChannels.SET_POWER, data: { applianceId: id, isOn: !state } } });
            return !state;
        });
    };

    return (
        appliance ? 
        (<Container p='2' border='1'>
                
                <p>Appliance type: {type}</p>
                <p>Owner name: {ownerName}</p>
                <p>Is working: {state.isOn ? 'Yes' : 'No'}</p>
                <button onClick={toggleOnOff}>On / Off</button>
                <br/>
            </Container>)
        : <p>Request state: {reqState}</p>
    );
};

export default ApplianceSettings;
