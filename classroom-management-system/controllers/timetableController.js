const Classroom = require('../models/Classroom');

// Create a timetable entry
exports.createTimetable = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { subject, startTime, endTime } = req.body;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Check for timetable overlaps
    const overlappingTimetable = classroom.timetable.find(timetable => 
      (startTime < timetable.endTime && endTime > timetable.startTime)
    );
    if (overlappingTimetable) {
      return res.status(400).json({ message: 'Timetable periods cannot overlap' });
    }

    // Check if the period is within classroom hours
    if (startTime < classroom.startTime || endTime > classroom.endTime) {
      return res.status(400).json({ message: 'Timetable period is out of classroom hours' });
    }

    // Add the timetable entry
    classroom.timetable.push({ subject, startTime, endTime });
    const updatedClassroom = await classroom.save();

    res.status(201).json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating timetable', error });
  }
};


// Get timetable by classroom ID
exports.getTimetableByClassroom = async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.classroomId);
  
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
  
      res.json(classroom.timetable);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching timetable', error });
    }
  };
