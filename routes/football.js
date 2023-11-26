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


    // // 1.6 Write Query in POST Method for Updating a Single Record
    
    // router.post('/update/:team', async (req, res) => {
    //     try {
    //       const updatedData = await Football.findOneAndUpdate(
    //         { team: req.params.team },
    //         req.body,
    //         { new: true }
    //       );
    //       res.json(updatedData);
    //     } catch (error) {
    //       res.status(500).json({ error: error.message });
    //     }
    //   });
   
    router.post('/update/:team', async (req, res) => {
      try {
          const teamName = req.params.team;
  
          const existingData = await Football.findOne({ Team: { $regex: new RegExp(teamName, 'i') } });
  
          if (!existingData) {
              console.log('No matching document found');
              return res.json({ message: 'No matching document found' });
          }
  
          // Update only the fields that exist in the existing document
          const updatedData = await Football.findOneAndUpdate(
              { Team: { $regex: new RegExp(teamName, 'i') } },
              { $set: req.body },
              { new: true, useFindAndModify: false } // Added useFindAndModify option
          );
  
          if (updatedData) {
              console.log('Document updated successfully');
              res.json(updatedData);
          } else {
              console.log('No documents were updated');
              res.json({ message: 'No documents were updated' });
          }
      } catch (error) {
          console.error('Error:', error.message);
          res.status(500).json({ error: error.message });
      }
  });
  
  
  
  




  // 1.8 Separate Endpoint Using POST Method for Deleting Record
  router.post('/delete/:team', async (req, res) => {
    try {
        const { team } = req.params;
        const deletedData = await Football.findOneAndDelete({ Team: team });
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
            { $match: { Year: parseInt(year) } }, // Use 'Year' instead of 'year'
            {
                $group: {
                    _id: null,
                    totalGamesPlayed: { $sum: '$Games Played' }, // Use 'Games Played' instead of 'gamesPlayed'
                    totalDraw: { $sum: '$Draw' }, // Use 'Draw' instead of 'draw'
                    totalWin: { $sum: '$Win' }, // Use 'Win' instead of 'win'
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
          const topTeams = await Football.find({ Win: { $gt: parseInt(wonValue) } }).limit(10); // Use 'Win' instead of 'win'
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
          { $match: { Year: parseInt(year) } },
          {
              $group: {
                  _id: '$Team',
                  averageGoalFor: { $avg: '$Goals For' },
              },
          },
      ]);
      res.json(averageGoals);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});




module.exports =  router
