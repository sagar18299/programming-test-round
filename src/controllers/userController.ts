import { Request, Response } from 'express';
import * as authService from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const response = await authService.login(username, password);
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    } else {
      res.status(401).json({ error: 'An unknown error occurred' });
    }
  }
};
