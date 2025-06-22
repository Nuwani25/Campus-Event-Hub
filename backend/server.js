// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');
const Event = require('./models/Event');
const Registration = require('./models/Registration');
const Feedback = require('./models/Feedback');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Change to a strong secret in production

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect('mongodb+srv://admin:admin123@cluster0.dswkrux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

  const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate' });
    }
  };

  // Middleware to check if the logged-in user is the creator of the event
const checkCreator = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    // If event not found
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    // Compare creator (assuming you store creator as req.user.id in JWT)
    if (event.creator && event.creator.toString() === req.user.id) {
      next();
    } else {
      res.status(403).json({ message: 'Not authorized to modify this event' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Routes

// Student Registrationnos

app.post('/students', async (req, res) => {
  try {
    const { name, email, password, department, year } = req.body;
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, email, password: hashedPassword, department, year });
    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering student', error });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) return res.status(400).json({ message: 'Invalid email or password' });

  // Compare password
  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  // Generate JWT token
  const token = jwt.sign(
    { id: student._id, email: student.email, role: student.role || 'student', name: student.name },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({
    token,
    student: {
      name: student.name,
      email: student.email,
      role: student.role || 'student'
    }
  });
});


// Event Creation
app.post('/events', auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      creator: req.user.id
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event' });
  }
});


// Fetch All Events (for Registration Form)
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Event Registration
app.post('/registrations', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Event registration successful' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering for event', error });
  }
});

// Feedback Submission
app.post('/feedbacks', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting feedback', error });
  }
});

// Get user's events
app.get('/my-events', auth, async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Update an event by ID
// Update event route (add auth and checkCreator middleware)
app.put('/events/:id', auth, checkCreator, async (req, res) => { // Modified line
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
});

// Delete event route (already correct)
app.delete('/events/:id', auth, checkCreator, async (req, res) => {
  // Existing correct implementation
});


// Delete event
app.delete('/events/:id', auth, checkCreator, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting event' });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
