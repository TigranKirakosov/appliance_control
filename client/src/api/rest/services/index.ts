import RestApplianceService from "./appliance.service";
import RestAuthService from "./auth.service";
import RestUserService from "./user.service";
import RestService from "../rest.service";
import LocalStorageService from "../../../utils/local-storage.service";

export const restService = new RestService();
const Services = {
    Auth: new RestAuthService(),
    Appliance: new RestApplianceService(),
    User: new RestUserService()
};

const authToken = LocalStorageService.getAuthTokenFromLS();

restService.setServicesReference(Object.values(Services))
restService.setGlobalAuthToken(authToken);

export default Services;
