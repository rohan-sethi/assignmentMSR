const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

module.exports = router;


router.get('/getArtist', adminController.getArtist);
router.post('/setCertify', adminController.setCertify);