
var friendData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });
    // check here for next https://umn.bootcampcontent.com/University-of-Minnesota-Boot-Camp/MINSTP201804FSF5/raw/master/01-Class-Content/13-express/01-Activities/16-HotRestaurant/Solved/routes/apiRoutes.js
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

};