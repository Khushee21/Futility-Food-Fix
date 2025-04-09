
const express = require('express');
const router = express.Router();
const { 
    createOccasional, 
    voteMenu, 
    getResults, 
    notifyStudents,
    getOccasion 
} = require('../controllers/occasionalController');

// Route to create a new occasional menu
router.post('/create', createOccasional);

// Route to vote for a menu item
router.post('/vote', voteMenu);  

// Route to get voting results
router.get('/results', getResults);

// New route to fetch the current occasion's menu data
router.get('/', getOccasion);

// Route to notify students about the occasion
router.post('/notify', notifyStudents);

module.exports = router;
