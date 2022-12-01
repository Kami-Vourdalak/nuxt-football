import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { blueBright, green, red, yellowBright } from "chalk";
import { formatISO} from 'date-fns';

const getProcessingTime = (time: [number, number]): string => {
  return `${(time[0] * 1000 + time[1] / 1000000).toFixed(2)}ms`;
};

/**
 * Add logs for API endpoints
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function endpointLogger(req: Request, res: Response, next: NextFunction) {
  const id = `[${uuid()}]`;
  const timestamp = formatISO(new Date());

  const methodUrl = yellowBright(`${req.method} : ${req.url}`)
  const start = process.hrtime();
  const timeStampText = blueBright(`[${timestamp}]`);

  console.log(`${id}${timeStampText} ${methodUrl}`);

  res.once("finish", () => {

    const end = process.hrtime(start);
    const endText = `END:${getProcessingTime(end)}`;
    const statusCode = res.statusCode < 400 ? green(res.statusCode) : red(res.statusCode)

    console.log(
      `${id}${timeStampText} ${methodUrl} ${statusCode} ${endText}`
    );
  });

  next();
}
