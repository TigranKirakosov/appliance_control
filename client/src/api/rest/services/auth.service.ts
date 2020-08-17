import RestService from "../rest.service";
import LocalStorageService from "../../../utils/local-storage.service";
import { restService } from "./index";

class RestAuthService extends RestService {

    public async authenticate(): Promise<any> {
        try {
            if (this.fetchApi.token) {
                const userRaw = await this.fetchApi.get('/api/auth');
                const user = {
                    email: userRaw.email,
                    nickName: userRaw.nickName,
                    id: userRaw._id
                };
                LocalStorageService.setValue('userId', userRaw._id);
                return (user);
            }
            LocalStorageService.setValue('userId', null);
            return ({
                email: null,
                nickName: null,
                id: null
            });
        } catch(error) {
            console.error(error.message);
        }
    }

    public async login(email: string, password: string): Promise<any> {
        try {
            const { data: { token } } = await this.fetchApi.post('/api/auth', { email, password });
            LocalStorageService.setAuthTokenToLS(token);
            restService.setGlobalAuthToken(token);
        } catch(error) {
            console.error('RestAuthService, login:', error.message);
        }
    }

    public isUserAuthenticated(): boolean {
        return !!LocalStorageService.getAuthTokenFromLS();
    }
}

export default RestAuthService;
