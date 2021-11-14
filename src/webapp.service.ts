import express, { Application, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { websiteRouter } from './routes/website.routing';

const app: Application = express(),
  limiter = rateLimit(
    {
      max: 15,
      windowMs: 60 * 1000,
      message: 'You are in block list IPs'
    });

app.set('view engine', 'ejs');
app.set('views', (path.join(__dirname, '../views')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/user', limiter);

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));

app.use((req: any, res: Response, next: NextFunction) =>
{
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', websiteRouter);

export const webapp = app;
