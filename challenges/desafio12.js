db.trips.aggregate([
  {
    $addFields: {
      qualDia: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: { qualDia: 5 },
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id",
      total: 1,
      _id: 0,
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  }
]);
