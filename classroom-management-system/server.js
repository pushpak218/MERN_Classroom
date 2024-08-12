const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const { protect, admin } = require('./middleware/authMiddleware');
const timetableRoutes = require('./routes/timetableRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Auth Routes
app.use('/api/auth', authRoutes);

// Protect classroom, teacher, and student routes
app.use('/api/classrooms', protect, admin, classroomRoutes);
//app.use('/api/teachers', protect, admin, teacherRoutes);
//app.use('/api/students', protect, admin, studentRoutes);
app.use('/api/timetables', protect,timetableRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
