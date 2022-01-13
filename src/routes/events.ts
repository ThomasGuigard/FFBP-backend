import {validateRequest} from "../middlewares/validate-request";
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Event } from "../models/event";

const router = express.Router();

router.post(
  '/api/events',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('You must supply a name'),
    body('date')
      .isISO8601()
      .withMessage('You must supply a valid date')
      .toDate(),
    body('kind')
      .isNumeric()
      .withMessage('You must supply an event kind'),
    body('challengersIds')
      .isArray()
      .withMessage('You must supply a valid array of challengers')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, date, kind, challengersIds } = req.body;

    const event = Event.build({ name, date, kind, challengersIds });
    await event.save();

    res.status(201).send(event);
  }
);

export { router as eventsRouter };