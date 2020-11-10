db.trips.aggregate([
  { $match: { startTime: { $ne: "" } } },
  { $addFields: { diaSemana: { $dayOfWeek: "$startTime" } } },
  { $match: { diaSemana: { $eq: 5 } } },
  { $group: { _id: "$startStationName", total: { $sum: 1 } } },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
