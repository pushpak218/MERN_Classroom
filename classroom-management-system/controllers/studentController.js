const User = require('../models/User');
const Student = require('../models/Student');
const Classroom = require('../models/Classroom');

// Assign students to a teacher
exports.assignStudentsToTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { studentIds } = req.body;

    // Find the teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'Teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Find the students and assign them
    const students = await User.find({ _id: { $in: studentIds }, role: 'Student' });
    if (students.length !== studentIds.length) {
      return res.status(400).json({ message: 'Some students were not found' });
    }

    // Assign students to the teacher
    teacher.students = studentIds;
    await teacher.save();

    res.json({ message: 'Students assigned to teacher successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning students', error });
  }
};


// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, classroomId } = req.body;

    // Create student
    const newStudent = new Student({
      name,
      email,
      password, // Ensure you hash the password in a real application
      classroom: classroomId
    });

    // Save student
    await newStudent.save();

    // Update classroom to add the student
    await Classroom.findByIdAndUpdate(classroomId, {
      $push: { students: newStudent._id }
    });

    res.status(201).json({ message: 'Student created and assigned to classroom' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

// Get students by classroom ID
exports.getStudentsByClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const students = await Student.find({ classroom: classroomId });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};
