db.trips.aggregate([
  {
    $match: {
      startTime: { $exists: true },
    },
  },
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: true,
      _id: false,
    },
  },
]);
