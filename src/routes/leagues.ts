import {validateRequest} from "../middlewares/validate-request";
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {League} from "../models/league";

const router = express.Router();

router.post(
  '/api/leagues',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('You must supply a name'),
    body('startedAt')
      .isISO8601()
      .withMessage('You must supply a valid date')
      .toDate(),
    body('challengersIds')
      .isArray()
      .withMessage('You must supply a valid array of challengers')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, startedAt, challengersIds } = req.body;

    const league = League.build({ name, startedAt, challengersIds });
    await league.save();

    res.status(201).send(league);
  }
);

export { router as leaguesRouter };