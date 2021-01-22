// operador $subtract consultado no manual do mongoDB
// https://docs.mongodb.com/manual/reference/operator/aggregation/subtract/
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            },
            60 * 60 * 1000,
          ],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
