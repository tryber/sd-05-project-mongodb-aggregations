db.trips.aggregate([
  { $match: { startTime: { $exists: 1 }, stopTime: { $exists: 1 } } },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: ["$duracaoMedia"] },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
