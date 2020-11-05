// _id: { $dayOfWeek: "$startTime" } substituted an $addFields stage.
db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
]);
