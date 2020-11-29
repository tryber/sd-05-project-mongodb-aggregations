/* DESAFIO 13
Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
Arredonde o resultado para cima.

O resultado da sua query deve ter o seguinte formato:
    { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
*/

const milisec = 1000;
const sec = 60;

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
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, milisec * sec],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);

/* LIÇÕES
- $match para selecionar as viagens que aconteceram naquele dia;
- agrupar os resultados do $match e fazer a média dentro do $group;
- $ceil executa a teto operação matemática; basicamente, é um arredondamento para "cima";
- referência utilizada para compreender melhor o ISODate():
https://www.compose.com/articles/understanding-dates-in-compose-mongodb/
- as consts milisec/sec foram criadas para melhor legibilidade do código
e por inspiração no código do colega Felipe Vieira;
*/

/* RESULTADO
    { "duracaoMediaEmMinutos" : 18 }
*/
