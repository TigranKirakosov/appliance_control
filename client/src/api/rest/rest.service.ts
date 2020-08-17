export class FetchApi {
    token: string;

    public setAuthToken(token: string) {
        this.token = token;
    }

    public async get(url: string) {
        const response = await fetch(url, {
            headers: {
                'auth-token': this.token
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    }

    public async post(url: string, payload: any) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': this.token
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            const data = await response.json();
            return { data, response };
        }
    }

    public async put(url: string, payload: any) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': this.token
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            const data = await response.json();
            return { data, response };
        }
    }

    public async delete(url: string) {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': this.token
            }
        });
        if (response.ok) {
            return { response };
        }
    }
};

class RestService {
    fetchApi: FetchApi;
    services: RestService[];

    constructor() {
        this.fetchApi = new FetchApi();
    }

    public setServicesReference(services: RestService[]) {
        this.services = services;
    }
    
    public setGlobalAuthToken (token: string) {
        for (const service of this.services) {
            service.setAuthToken(token);
        }
    };
    
    public setAuthToken(token: string): void {
        this.fetchApi.setAuthToken(token);
    }
}

export default RestService;
