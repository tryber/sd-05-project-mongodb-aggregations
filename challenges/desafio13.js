/*
Desafio 13
Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos. Arredonde o resultado para cima.

O resultado da sua query deve ter o seguinte formato:

{ "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
*/

db.trips.aggregate([
  {
    $addFields: {
      startTimeString: { $dateToString: { date: "$startTime", format: "%d-%m-%Y" } },
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } // duração da viagem em minutos
    }
  },
  { $match: { startTimeString: "10-03-2016" } },
  { $group: { _id: 0, duracaoMediaEmMinutos: { $avg: "$duracao" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } }
]);
