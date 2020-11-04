// Desafio 13
// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos. Arredonde o resultado para cima.

// O resultado da sua query deve ter o seguinte formato:

// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.0Z"),
        $lt: ISODate("2016-03-11T00:00:00.0Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $round: ["$duracaoMediaEmMinutos"],
      },
    },
  },
]);
