/*
Desafio 10
Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas decimais e a média de viagens ordenada de forma crescente. Para arredondar a média use o $round.

O resultado da sua query deve ter o seguinte formato:

{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ...
*/

db.trips.aggregate([
  {
    $addFields: {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] }
    }
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" }
    }
  },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] } } },
  { $sort: { duracaoMedia: 1 } }
]);