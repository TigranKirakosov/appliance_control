import React, { useState, useLayoutEffect } from 'react';
import Services from '../../api/rest/services';
import store from '../../state/store';
import ApplianceCard from '../components/appliance-card';
import { EAppliance } from '../../models/appliance.model';

const HomePage: React.FC = () => {
    const [{ appliances }, setState] = useState(store.getValue());
    const [applianceOption, setApplianceOption] = useState(EAppliance.OVEN);

    useLayoutEffect(() => {
        const subscription = store.storage$.subscribe(setState);
        Services.Appliance.getAppliancesList()
            .then(data => store.dispatch({ type: 'FETCH_APPLIANCES', payload: data }))
            .catch(error => console.error(error));
        return () => subscription.unsubscribe();
    }, []);

    const onGet = async (id: string) => {
        const { data: updatedAppliance } = await Services.Appliance.registerToUser(id);

        setState(state => {
            return ({
                ...state,
                appliances: state.appliances.map(appliance => {
                    if (appliance._id === id) return updatedAppliance;
                    return appliance;
                })
            });
        });
    };

    const onRemove = async (id: string) => {
        await Services.Appliance.unregisterFromUser(id);
        setState(state => {
            return ({
                ...state,
                appliances: state.appliances.map(appliance => {
                    if (appliance._id === id) return ({
                        ...appliance,
                        owner: null,
                        ownerName: null
                    });
                    return appliance;
                })
            });
        });
    };

    const onOptionClick = ({ target: { value }}) => setApplianceOption(value);

    const onApplianceRegister = async (e) => {
        e.preventDefault();
        const { data: appliance } = await Services.Appliance.register(applianceOption);
        store.dispatch({ type: 'ADD_APPLIANCE', payload: appliance });
    };

    return (
        <div>
            <h1>Home page</h1>
            <h2>Appliances list</h2>

            <input type="radio" id="oven" name="applianceType" onChange={onOptionClick} defaultChecked value={EAppliance.OVEN} />
            <label htmlFor="oven">Oven</label><br/>
            <input type="radio" id="refrigerator" name="applianceType" onChange={onOptionClick} value={EAppliance.REFRIGERATOR} />
            <label htmlFor="refrigerator">Refrigerator</label><br/>
            <input type="radio" id="washer" name="applianceType" onChange={onOptionClick} value={EAppliance.WASHER} />
            <label htmlFor="washer">Washer</label><br/>

            <button disabled={!Services.User.getUserId} onClick={onApplianceRegister}>Register new Appliance</button>

            {appliances && appliances.map(({ _id, owner, ownerName, type }) => 
                (<ApplianceCard
                    key={_id}
                    applianceInfo={{
                        id: _id,
                        owner,
                        ownerName,
                        type
                    }}
                    onGet={onGet}
                    onRemove={onRemove}
                    showGet={() => owner === null && !!Services.User.getUserId()}
                    showSettings={() => owner === Services.User.getUserId()} />)
            )}
        </div>
    );
};

export default HomePage;
