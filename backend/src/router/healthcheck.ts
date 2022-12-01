import { Request, Response } from 'express';

export function healthcheck(_: Request, response: Response) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    response.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    response.status(503).send();
  }
}
