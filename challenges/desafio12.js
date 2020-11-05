db.trips.aggregate([
  { $match: { startTime: { $ne: "" } } },
  { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  // { "diaDaSemana" : 5, "total" : 357594 } retorno do exercício anterior
  // ou seja o dia 5 é o com o maior número de viagens.
  { $match: { diaDaSemana: 5 } },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
