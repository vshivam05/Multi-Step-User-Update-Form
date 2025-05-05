const express = require('express');
const { createUser, checkUsername, updateUser } = require('../controller/userController');
const { upload } = require('../middleware/fileUpload');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

router.post('/', upload.single('profilePhoto'), createUser);
router.get('/check-username', checkUsername);
router.put('/:id', upload.single('profilePhoto'), validateUser, updateUser);

module.exports = router;
