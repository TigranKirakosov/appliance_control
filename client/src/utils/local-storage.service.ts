class LocalStorageService {
    static getAuthTokenFromLS(): string {
        const token = localStorage.getItem('auth-token');
        return token;
    }

    static setAuthTokenToLS(token: string): void {
        localStorage.setItem('auth-token', token);
    }

    static setValue(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getValue(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }
}

export default LocalStorageService;
