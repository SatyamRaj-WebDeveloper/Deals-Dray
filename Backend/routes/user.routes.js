import Router from 'express';
import {
   registerUser,
   loginUser,
   creatEmployee,
   getAllEmployee,
   deleteUser,
   editUser
} from '../controllers/user.controllers.js'
import { upload } from '../middlewares/multer.middleware.js';

const router = Router()

router.route('/registerUser').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/getAllEmployees').get(getAllEmployee)
router.route('/createEmployee').post(upload.single('Image'), creatEmployee);
router.route('/deleteUser/:userId').post(deleteUser)
router.route('/edituser/:userId').post(upload.single('Image'),editUser)

export default router;