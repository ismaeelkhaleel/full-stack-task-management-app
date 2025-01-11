import express from 'express';
import {authenticateUser} from '../middleware/authMiddleware.js';
import { addMenuItem, deleteMenuItem, getAllMenuItems, getMyMenuItems, updateMenuItem } from '../controllers/menuController.js';


const router = express.Router();


router.get('/menu', getAllMenuItems);
router.post('/add', authenticateUser, addMenuItem);
router.put('/update/:id', authenticateUser, updateMenuItem);
router.delete('/delete/:id', authenticateUser, deleteMenuItem);
router.get('/addByMe', authenticateUser, getMyMenuItems);
export default router;