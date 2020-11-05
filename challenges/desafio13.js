// MATCH - startTime
// Determine a duração média das viagens iniciadas no dia 10/03/2016

// GROUP
// ...em minutos (mesmo calculo desafio 10 mas com 1000 * 60 ou seja milisegundos * segundos)
// Arredonde o resultado para cima ($ceil).

// PROJECT
// O resultado da sua query deve ter o seguinte formato:
// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lt: ISODate("2016-03-11T00:00:00Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaMns: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaMns" },
    },
  },
]);

// { "duracaoMediaEmMinutos" : 18 } OK
