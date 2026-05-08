export const tokenLib =  {
    
    setToken: (value:string) => {
        localStorage.setItem('token', JSON.stringify(value));
    },
    getToken: () => {
        const value = localStorage.getItem('token');
        return value ? JSON.parse(value) : null;
    },
    removeToken: () => {
        localStorage.removeItem('token');
    }
}
