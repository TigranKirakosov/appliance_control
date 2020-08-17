import { IWSNotification } from "../../interfaces";
import { IAppliance } from "../../../../models/appliance.model";

export interface IWSApplianceResponse {
    reqState: IWSNotification,
    appliance?: IAppliance,
    message?: string,
    reason?: string
};
