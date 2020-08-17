import RestService from "../rest.service";
import LocalStorageService from "../../../utils/local-storage.service";
import { restService } from ".";

class RestUserService extends RestService {   
    public async register(nickName: string, email: string, password: string): Promise<any> {
        try {
            const { data: { token } } = await this.fetchApi.post('/api/users', { nickName, email, password });
            LocalStorageService.setAuthTokenToLS(token);
            restService.setGlobalAuthToken(token);
        } catch(error) {
            console.error(error.message);
        }
    }

    public getUserId(): string {
        return LocalStorageService.getValue('userId');
    }
}

export default RestUserService;
