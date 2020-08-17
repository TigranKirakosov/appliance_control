import useWebsocket from "../useWebsocket";
import LocalStorageService from "../../../utils/local-storage.service";

const useApplianceWS = (subscribers, refObj) => useWebsocket({
    url: 'ws://localhost:4400',
    authToken: LocalStorageService.getAuthTokenFromLS(),
    subscribers,
    refObj
});

export default useApplianceWS;
