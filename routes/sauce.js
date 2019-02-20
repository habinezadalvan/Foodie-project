const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config')




router.get('/', auth,sauceCtrl.getposts);
router.post('/', auth, multer, sauceCtrl.createPosts);
router.get('/:id', auth,sauceCtrl.getOnePost);
router.put('/:id', auth, multer,sauceCtrl.modifyOne);
router.delete('/:id', auth, sauceCtrl.deletePost);




module.exports = router;