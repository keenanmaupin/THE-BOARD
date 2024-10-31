import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await axios.post('/api/login', userInfo);
    return { success: true, token: response.data.token }; // Ensure the token is correctly fetched from the response
  } catch (error: unknown) {
    // Check if error is an instance of Error before accessing message
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' }; // Handle unknown error
  }
};

export { login };
