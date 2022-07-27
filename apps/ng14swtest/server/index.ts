import { Router, json, urlencoded } from 'express';
import noti from './noti';

const router = Router();

router.use(json({ limit: '5mb' }));
router.use(urlencoded({ limit: '5mb', extended: true }));

router.use('/noti', noti);

export default router;
