const Classroom = require('../models/Classroom');
const User = require('../models/User');

// Create a new classroom
exports.createClassroom = async (req, res) => {
  const { name, startTime, endTime, days } = req.body;
  try {
    const newClassroom = new Classroom({ name, startTime, endTime, days });
    const savedClassroom = await newClassroom.save();
    res.status(201).json(savedClassroom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating classroom', error });
  }
};

// Assign a teacher to a classroom
exports.assignTeacherToClassroom = async (req, res) => {
  const { classroomId } = req.params;
  const { teacherId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'Teacher') {
      return res.status(404).json({ message: 'Teacher not found or not a teacher' });
    }

    // Assign the teacher to the classroom
    classroom.teacher = teacherId;
    const updatedClassroom = await classroom.save();

    res.json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning teacher', error });
  }
};

// Get all classrooms
exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classrooms', error });
  }
};

// Get a classroom by ID
exports.getClassroomById = async (req, res) => {
  const { id } = req.params;
  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classroom', error });
  }
};

// Update a classroom
exports.updateClassroom = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedClassroom) return res.status(404).json({ message: 'Classroom not found' });
    res.json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: 'Error updating classroom', error });
  }
};

// Delete a classroom
exports.deleteClassroom = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(id);
    if (!deletedClassroom) return res.status(404).json({ message: 'Classroom not found' });
    res.json({ message: 'Classroom deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting classroom', error });
  }
};
