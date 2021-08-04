import { Router } from 'express';
import { check, body } from 'express-validator';
import { fieldsValidators } from '../middlewares/fields-validator';
const router = Router();

// Import Controllers
import { getAllStores, getStores, createStore } from '../controllers/store.controller'; 

router.get('/stores/all', getAllStores);

router.get('/stores/list', [
    check('page', 'Page number is required').not().isEmpty(),
    check('page', 'Page must be a number').isNumeric(),
    fieldsValidators
], getStores);

router.post('/stores/create', [
    body('name', 'Store name is required').not().isEmpty(),
    body('address', 'Store address is required').not().isEmpty(),
    fieldsValidators
], createStore);

router.post('/stores/delete/:id', [
    check('id', 'Store Id is required').not().isEmpty(),
    check('id', 'Store Id is not valid').isInt(),
    fieldsValidators
], );

export default router;