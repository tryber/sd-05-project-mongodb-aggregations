// Desafio 10
// Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com
// apenas duas casas decimais e a média de viagens ordenada de forma crescente.
// Para arredondar a média use o $round.

// O resultado da sua query deve ter o seguinte formato:
// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// // ...

db.trips.aggregate([
  { $addFields: { tempoVoo: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000] } } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$tempoVoo" },
  } },
  { $project: {
    _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]).pretty();
