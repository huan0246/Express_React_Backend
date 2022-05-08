import { Router, Request, Response } from 'express';
import providedJSON from '../../data/repos.json';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.status(200);
  axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((response) => {
      const combinedArr = [...providedJSON, ...response.data];
      const forkFalseArrInCombinedArr: any[] = [];
      // eslint-disable-next-line array-callback-return
      combinedArr.map((item) => {
        if (item.fork === false) {
          forkFalseArrInCombinedArr.push(item);
        }
      });
      res.send(forkFalseArrInCombinedArr);
    })
    .catch((err) => res.send(err));

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
});
