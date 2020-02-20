const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const router = express.Router();
const upload = multer(uploadConfig);

router.get('/', (req, res) => {
	return res.json({ message: 'AirCnC running' });
});

router.post('/sessions', SessionController.store);

router.get('/spots', SpotController.index);
router.post('/spots', upload.single('thumbnail'), SpotController.store);

router.post('/spots/:spot_id/bookings', BookingController.store);

router.get('/dashboard', DashboardController.show);

module.exports = router;