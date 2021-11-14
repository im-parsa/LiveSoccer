import express from 'express';
import { main } from '../controllers/website.controller';

const router = express.Router();

router.get('/', main);


export const websiteRouter = router;
