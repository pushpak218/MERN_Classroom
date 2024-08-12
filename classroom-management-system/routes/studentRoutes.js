const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect, admin } = require('../middleware/authMiddleware');

// Assign students to a teacher (protected route)
router.put('/assign-students/:teacherId', protect, admin, studentController.assignStudentsToTeacher);


// Route to create a new student
router.post('/create', protect, admin, studentController.createStudent);

// Route to get students by classroom ID
router.get('/classroom/:classroomId', protect, studentController.getStudentsByClassroom);


module.exports = router;
