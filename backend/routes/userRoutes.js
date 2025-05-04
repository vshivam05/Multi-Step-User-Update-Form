import express from 'express';
import { createUser, checkUsername, updateUser } from '../controllers/userController.js';
import { upload } from '../middleware/fileUpload.js';
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

router.post('/', upload.single('profilePhoto'), validateUser, createUser);
router.get('/check-username', checkUsername);
router.put('/:id', upload.single('profilePhoto'), validateUser, updateUser);

export default router;