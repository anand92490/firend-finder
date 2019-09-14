
let friends = require("../data/friend");
// console.log(friends);

module.exports = function (app) {

  // API GET Requests found in friend.js as JSON 
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  // API POST Requests
  app.post("/api/friends", function (req, res) {
    //TODO check the middleware for data parsing 
    // console.log(req.body);

    //store the friends object in a user letiable
    let user = req.body;

    //converts the iser score into an Integer
    for (let i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }


    let newMatch = 0;
    let minimumDifference = 35;


    //loop over the friends object and compare the user input with friend[i].scores and add the difference and total difference

    for (let i = 0; i < friends.length; i++) {
      let totalDifference = 0;
      for (let j = 0; j < friends[i].scores.length; j++) {
        let difference = Math.abs(user.scores[j] - friends[i].scores[j]);

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

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friends.length = 0;
    res.json({ ok: true });
  });
};
