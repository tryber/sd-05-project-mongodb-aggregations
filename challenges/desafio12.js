// Determine qual estação tem o maior número de viagens nesse dia da semana (startStationName)
// Mas, para isso, adicione o que for necessário ao pipeline anterior (MATCH diaDaSemana = 5)
// Dica: operador $dayOfWeek novamente

// PROJECT
// Exiba apenas o nome da estação e o total de viagens
// O resultado da sua query deve ter o seguinte formato:
// { "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }

db.trips.aggregate([
  {
    $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } },
  },
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
      startStationName: "$_id",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

// retorna bem { "startStationName" : "Pershing Square North", "total" : 5391 }
