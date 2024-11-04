import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET || 'onthelow' ; 
    const token = jwt.sign({ username: user.username, id: user }, secretKey, { expiresIn: '1h' });

    // Return the token
    return res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
