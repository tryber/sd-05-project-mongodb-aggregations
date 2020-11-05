db.trips.aggregate(
  [
    { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
    { $match: { diaDaSemana: 5 } },
    { $group: { _id: "$endStationName", _total: { $sum: 1 } } },
    { $sort: { _total: -1 } },
    { $limit: 1 },
    { $project: { _id: 0, nomeEstacao: "$_id", total: "$_total" } },
  ],
);
