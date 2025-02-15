import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get available volunteers based on criteria
router.post('/available', async (req, res) => {
  try {
    const { location, skills, timeSlots } = req.body;

    const pipeline = [
      {
        $match: {
          role: 'volunteer',
          'volunteerProfile.skills': { $in: skills },
          'profile.city': location,
          'volunteerProfile.availability.timeSlots': { $in: timeSlots }
        }
      },
      {
        $project: {
          firstName: '$profile.firstName',
          lastName: '$profile.lastName',
          skills: '$volunteerProfile.skills',
          availability: '$volunteerProfile.availability',
          experience: '$volunteerProfile.experience'
        }
      }
    ];

    const volunteers = await User.aggregate(pipeline);
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;