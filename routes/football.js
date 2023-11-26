const express = require('express')
const router = express.Router()
const Football= require("../models/football")


router.get('/',async(req,res)=>{

        try{
            const footballs= await Football.find()
            res.json(footballs)
        }catch{
            res.send( 'err')
        }
})


// 1.5 Add Query in POST Method to Add Data



router.post('/add', async (req, res) => {
    try {
      //console.log('Request Body:', req.body);
  
      const newData = new Football(req.body);
      await newData.save();
  
      // Retrieve the complete document from the database
      const savedData = await Football.findById(newData._id);
  
      res.json(savedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


    // 1.6 Write Query in POST Method for Updating a Single Record
    
    router.post('/update/:team', async (req, res) => {
        try {
          const updatedData = await Football.findOneAndUpdate(
            { team: req.params.team },
            req.body,
            { new: true }
          );
          res.json(updatedData);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });

  // 1.8 Separate Endpoint Using POST Method for Deleting Record
  router.post('/delete/:team', async (req, res) => {
    try {
      const deletedData = await Football.findOneAndDelete({ team: req.params.team });
      res.json(deletedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 1.7 Separate Get Method to Show Total Games Played, Draw, and Won for the Given Year
  router.get('/stats/:year', async (req, res) => {
    try {
      const { year } = req.params;
      const stats = await Football.aggregate([
        { $match: { year: parseInt(year) } },
        {
          $group: {
            _id: null,
            totalGamesPlayed: { $sum: '$gamesPlayed' },
            totalDraw: { $sum: '$draw' },
            totalWin: { $sum: '$win' },
          },
        },
      ]);
      res.json(stats[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
      
    // 1.9 Endpoint to Display First 10 Records with "Won" Greater Than a Given Value
  router.get('/top-teams/:wonValue', async (req, res) => {
    try {
      const { wonValue } = req.params;
      const topTeams = await Football.find({ win: { $gt: parseInt(wonValue) } }).limit(10);
      res.json(topTeams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

    // 2.0 Endpoint with Query to Display All Teams Where Average "Goal For" for a Given Year
    router.get('/average-goals/:year', async (req, res) => {
        try {
          const { year } = req.params;
          const averageGoals = await Football.aggregate([
            { $match: { year: parseInt(year) } },
            {
              $group: {
                _id: '$team',
                averageGoalFor: { $avg: '$goalsFor' },
              },
            },
          ]);
          res.json(averageGoals);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });




module.exports =  router
