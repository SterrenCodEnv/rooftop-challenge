import { Router } from 'express';
const router = Router();

// Import Controllers
import { existingCoupons, assignedCoupons, unassignedCoupons, assignedsPerDay } from '../controllers/stat.controller'; 

router.get('/stats/existing-coupons', existingCoupons);

router.get('/stats/assigned-coupons', assignedCoupons);

router.get('/stats/unassigned-coupons', unassignedCoupons );

router.get('/stats/assigneds-per-day', assignedsPerDay);
export default router;