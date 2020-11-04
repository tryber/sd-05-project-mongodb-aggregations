// Desafio 10
// Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas decimais e a média de viagens ordenada de forma crescente. Para arredondar a média use o $round.

// O resultado da sua query deve ter o seguinte formato:

// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// // ...

/**
 * _id: The id of the group.
 * fieldN: The first field name.
 */
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0
    },
  },
]);

// https://stackoverflow.com/questions/48369419/how-to-subtract-two-date-time-in-mongodb
