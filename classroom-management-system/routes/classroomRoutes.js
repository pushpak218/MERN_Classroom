const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/create', classroomController.createClassroom);

// Other routes...
// Assign a teacher to a classroom (protected route)
router.put('/assign-teacher/:classroomId', protect, admin, classroomController.assignTeacherToClassroom);

// Route to get a list of all classrooms
router.get('/classroom', protect, classroomController.getAllClassrooms);

// Route to get details of a single classroom
router.get('/:id', protect, classroomController.getClassroomById);

// Route to update a classroom's details
router.put('/:id', protect, admin, classroomController.updateClassroom);

// Route to delete a classroom
router.delete('/:id', protect, admin, classroomController.deleteClassroom);


module.exports = router;
