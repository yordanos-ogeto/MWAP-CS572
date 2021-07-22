const dbConnection = require("../data/dbconnection");

module.exports.getAllGame = function (req, res) {
  let maxcount = 7;
  let minCount = 5;
  let count = minCount;
  if (req.query.count) {
    count =
      parseInt(req.query.count) > maxCount
        ? maxCount
        : parseInt(req.query.count);
  }
  const db = dbConnection.get();
  const collection = db.collection("games");

  collection
    .find()
    .limit(count)
    .toArray(function (err, docs) {
      console.log("Found games", docs);
      res.status(200).json(docs);
    });
};
