import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const { token } = await response.json();
    
    // Store the token using AuthService and redirect to the home page
    import('../services/AuthService').then(({ default: AuthService }) => {
      AuthService.login(token);
    });

    return { success: true };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, error: error.message };
  }
};

export { login };
