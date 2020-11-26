db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, startTime: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: { $max: "$startTime" } } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
