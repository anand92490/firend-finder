
var friends = require("../data/friends");
// console.log(friends)

module.exports = function (app) {

  // API GET Requests found in friend.js as JSON 
  app.get("/api/friends", function (req, res) {
  
    res.json(friends);
  });


  // API POST Requests
  app.post("/api/friends", function (req, res) {
    
    // console.log(req.body.scores);
  
    var user = req.body;

    //loopsconverts the user score into an Integer
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }


    var newMatch = 0;
    var minimumDifference = 40;


    //loop over the friends object and compare the user input with friend[i].scores and add the difference and total difference

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);

        totalDifference += difference;
      }

      //if there is a new minimumDifference, set newMatch for next iteration comparison
      if (totalDifference < minimumDifference) {
        newMatch = i;
        minimumDifference = totalDifference;

      }


    }

    //after finding a match, add user to a friend array
    friends.push(user);
    res.json(friends[newMatch]);

  });

};
