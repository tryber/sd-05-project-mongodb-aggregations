const secInMin = 60;
const milInSecon = 1000;
const constant = secInMin * milInSecon;

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, constant],
        },
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $limit: 5 },
]);
