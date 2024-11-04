import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  
  // Decodes the token and returns the payload
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Checks if the user is logged in by verifying that a valid token is present
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  // Determines if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) {
        return true;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Retrieves the token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  // Stores the token in localStorage and redirects to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Removes the token from localStorage and redirects to the login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
