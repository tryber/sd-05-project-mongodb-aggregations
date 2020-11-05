// Encontre a média de viagens por tipo de usuário.
// (GROUP usertype - avg e sub startTime e stopTime)

// Exiba o valor em horas com apenas duas casas decimais ($round 2)
// e a média de viagens ordenada de forma crescente (SORT)

// O resultado da sua query deve ter o seguinte formato (PROJECT):
// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      // nao pode declarar o tipo ainda neste estagio jà que _id acabou de ser criado
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      // nao pode ser tipo: "$usertype" para considerar o agrupamento precedente
      duracaoMedia: { $round: ["$duracaoMedia", 2] }
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);

// retorna
// { "tipo" : "Subscriber", "duracaoMedia" : 0.22 }
// { "tipo" : "Customer", "duracaoMedia" : 0.71 }
