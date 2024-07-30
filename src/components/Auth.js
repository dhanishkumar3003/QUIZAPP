// auth.js
export const isAuthenticated = () => {
    return !!sessionStorage.getItem('loggedin');
};