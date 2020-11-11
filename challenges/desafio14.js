db.trips.aggregate([
  { $group:
    {
      _id: "$bikeid",
      duracaoMediaEmMinutos: {
        $avg:
      { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $project: { _id: 0, bikeid: "$_id", duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", 1000 * 60] } } } },
  { $sort: { duracaoMediaEmMinutos: -1 } },
  { $limit: 5 },
]);
