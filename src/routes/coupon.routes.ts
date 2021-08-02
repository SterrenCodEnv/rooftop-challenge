import { Router } from 'express';
import { check } from 'express-validator';
import { fieldsValidators } from '../middlewares/fields-validator';
const router = Router();

// Import Controllers
import { getCoupons, getCouponByEmail, createCoupon } from '../controllers/coupon.controller'; 

router.get('/coupons', getCoupons);

router.get('/coupon', [
    check('email', 'Email is required').isEmail(),
    check('code', 'Coupon code is required').not().isEmpty(),
    check('code', 'Coupon code must have 8 letters').isLength({max: 8, min:8}),
    fieldsValidators
], getCouponByEmail);

router.post('/coupon', [
    check('code', 'Coupon code is required').not().isEmpty(),
    check('code', 'Coupon code must have 8 letters').isLength({max: 8, min:8}),
], createCoupon);

export default router;