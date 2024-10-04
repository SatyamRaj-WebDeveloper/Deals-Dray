import Router from 'express';
import {
   registerUser,
   loginUser,
   creatEmployee,
} from '../controllers/user.controllers.js'

const router = Router()

router.route('/registerUser').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/createEmployee').post(creatEmployee);

export default router;