db.trips.aggregate([
  {
    $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } },
  },
  { $match: { diaDaSemana: 5 } },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: +1 },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id",
      _id: 0,
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
