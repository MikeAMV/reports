import express, { Request, Response } from 'express';
import { GetKeyPushInteractor } from '../use-cases/get-key-push.interactor';

export class NotificationController {
  static async getKey(req: Request, res: Response) {
    try {
      const interactor = new GetKeyPushInteractor();
      const publicKey = await interactor.execute();
      res.status(200).json({ publicKey });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  }
}

export const notificationRouter = express.Router();

notificationRouter.get(`/`, NotificationController.getKey);
