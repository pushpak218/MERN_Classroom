const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const { protect } = require('../middleware/authMiddleware');

// Create a timetable entry (protected route)
router.post('/create/:classroomId', protect, timetableController.createTimetable);

// Route to create a timetable
router.post('/create', protect, timetableController.createTimetable);

// Route to get timetable by classroom ID
router.get('/classroom/:classroomId', protect, timetableController.getTimetableByClassroom);

module.exports = router;
