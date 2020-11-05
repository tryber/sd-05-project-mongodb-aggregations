// Baseado na duração média das viagens, (conservar uma parte do desafio13)
// determine quais são as 5 bicicletas que foram mais utilizadas. (LIMIT)
// Exiba o resultado em minutos arredondados para cima ($ceil)
// e em ordem decrescente. (SORT)

// O resultado da sua query deve ter o seguinte formato (PROJECT):
// 5 entradas no modelo { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMed: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMed" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
