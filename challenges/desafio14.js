// Baseado na duração média das viagens, determine quais são as
// 5 bicicletas que foram mais utilizadas. SORT -1 e LIMIT
// Exiba o resultado em minutos arredondados para cima $ceil e em ordem decrescente.
// O resultado da sua query deve ter o seguinte formato:

// { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      tempoMedio: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$tempoMedio" },
    },
  },
  { $limit: 5 },
  {
    $sort: { duracaoMedia: -1 },
  },
]);
