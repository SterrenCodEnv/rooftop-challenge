import { Router } from 'express';
import { check, body } from 'express-validator';
import { fieldsValidators } from '../middlewares/fields-validator';
const router = Router();

// Import Controllers
import { getCoupons, getCouponByEmail, createCoupon, updateCoupon, deleteCoupon } from '../controllers/coupon.controller'; 

router.get('/coupons/all', getCoupons);

router.get('/coupons/email', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('code', 'Coupon code is required').not().isEmpty(),
    check('code', 'Coupon code must have 8 letters').isLength({max: 8, min:8}),
    fieldsValidators
], getCouponByEmail);

router.post('/coupons/create', [
    body('code', 'Coupon code is required').not().isEmpty(),
    body('code', 'Coupon code must have 8 letters').isLength({max: 8, min:8}),
    body('expires_at', 'Expires at is required').not().isEmpty(),
    fieldsValidators
], createCoupon);

router.patch('/coupons/assign/:id', [
    check('id', 'Coupon Id is required').not().isEmpty(),
    check('id', 'Coupon Id is not valid').isInt(),
    body('email', 'Email is required').not().isEmpty(),
    body('email', 'Email is not valid').isEmail(),
    fieldsValidators
], updateCoupon );

router.patch('/coupons/delete/:id', [
    check('id', 'Coupon Id is required').not().isEmpty(),
    check('id', 'Coupon Id is not valid').isInt(),
    fieldsValidators
], deleteCoupon );

export default router;