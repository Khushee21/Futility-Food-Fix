

const express = require('express');
const router = express.Router();
const { 
    createOccasional, 
    voteMenu, 
    getResults, 
    notifyStudents,
    getOccasion 
} = require('../controllers/occasionalController');


router.post('/create', createOccasional);



router.post('/vote', voteMenu);  


router.get('/results', getResults);


router.get('/', getOccasion);


router.post('/notify', notifyStudents);

module.exports = router;
