import { Router, Request, Response } from 'express';
import { sendResponse } from './utils/responseUtils';
import STATUS_CODES from './utils/statusCodes';
import sessions from './routes/sessions';


const router = Router();

router.get('/', (req: Request, res: Response) => {
    sendResponse(res, true, null, 'API is running', STATUS_CODES.OK);
});

router.use("/sessions", sessions)



export default router;