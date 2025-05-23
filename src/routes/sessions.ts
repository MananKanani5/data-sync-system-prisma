import express from 'express';
import { getSessions } from '../contorllers/sessions';

const router = express.Router();


router.get('/', getSessions)
export default router;
