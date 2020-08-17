import RestService from "../rest.service";
import { EAppliance } from "src/models/appliance.model";

class RestApplianceService extends RestService {
    
    public async getAppliancesList(): Promise<any> {
        try {
            const appliances = await this.fetchApi.get('/api/appliances');
            return appliances;
        } catch(error) {
            console.error(error.message);
        }
    }

    public async register(type: EAppliance): Promise<any> {
        try {
            const appliance = await this.fetchApi.post('/api/appliances', { type });
            return appliance;
        } catch(error) {
            console.error(error.message);
        }
    }

    public async registerToUser(applianceId: string): Promise<any> {
        try {
            const appliance = await this.fetchApi.put(`/api/appliances/${applianceId}`, {});
            return appliance;
        } catch(error) {
            console.error(error.message);
        }
    }

    public async unregisterFromUser(applianceId: string): Promise<any> {
        try {
            await this.fetchApi.delete(`/api/appliances/${applianceId}`);

            // TODO: Replace console.logs to notification service
            console.log('Unregistered appliance');
        } catch(error) {
            console.error(error.message);
        }
    }
}

export default RestApplianceService;
