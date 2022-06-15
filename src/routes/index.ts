import { Express, Request, Response } from 'express';
import usersRouter from './v1/users.routes';
import 'express-async-errors';
import sessionRouter from './v1/sessions.routes';

function routes(app: Express) {
  /**
   * @openapi
   * /api/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use('/user', usersRouter);
  app.use('/session', sessionRouter);
}

export default routes;
