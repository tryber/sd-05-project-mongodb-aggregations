// Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas
// duas casas decimais e a média de viagens ordenada de forma crescente.
// Para arredondar a média use o $round.

// O resultado da sua query deve ter o seguinte formato:

// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }

// Fazer o group pelo $usertype, cria o campo duracaoMedia sendo a media do intervalo de tempo

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      // Não pode ser usado o "$usertype" pra usar o valor do Group anterior
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
