db.trips.aggregate([
  {
    $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } },// Gera documentos que contêm todos os campos existentes
    // (dayOfWeek) extrair o dia da semana como numero
  },
  { $match: { diaDaSemana: 5 } }, // retorna os dias da semana que contenha 5
  {
    $group: { // agrupa elementos distintos
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $project: { // passa os campos solicitados para o pipeline
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
  { $sort: { total: -1 } }, // ordena descrescentemente
  { $limit: 1 }, // limitando a um resultado
]);
