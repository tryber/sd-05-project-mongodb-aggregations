db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [{ $dayOfWeek: "$startTime" }, 5],
      },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $limit: 1 },
  {
    $project: {
      nomeEstacao: "$_id",
      total: 1,
      _id: 0,
    },
  },
]);
