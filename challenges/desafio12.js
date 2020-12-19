// Agora que você já sabe o dia com mais viagens, determine qual estação tem o maior número de
// viagens nesse dia da semana. Mas, para isso, adicione o que for necessário ao pipeline anterior.
// Exiba apenas o nome da estação e o total de viagens.

db.trips.aggregate([
  {
    $match: {
      $expr: { $eq: [5, { $dayOfWeek: "$startTime" }] },
    },
  },
  {
    $group: {
      _id: {
        id: "$startStationId",
        name: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.name",
      total: "$total",
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
]);
