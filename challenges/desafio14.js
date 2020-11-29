/* DESAFIO 14
Baseado na duração média das viagens, determine quais são as 5 bicicletas que foram mais utilizadas.
Exiba o resultado em minutos arredondados para cima e em ordem decrescente.

O resultado da sua query deve ter o seguinte formato:
    { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> } (5 linhas assim)
*/

const milisec = 1000;
const sec = 60;

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, milisec * sec],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

/* LIÇÕES
- reaproveitando parte da pipeline do desafio anterior para mostrar a duração média das viagens;
- no $group: agrupa por bikeid (tudo minúsculo) mas projeta com bikeId (camelCase);
- $ceil executa a teto operação matemática; basicamente, é um arredondamento para "cima";
- $sort de forma decrescente (valor: -1);
- operador $limit vai fazer mostrar só as 5 mais utilizadas;
*/

/* RESULTADO
{ "bikeId" : 18105, "duracaoMedia" : 869 }
{ "bikeId" : 17101, "duracaoMedia" : 603 }
{ "bikeId" : 19857, "duracaoMedia" : 436 }
{ "bikeId" : 18564, "duracaoMedia" : 412 }
{ "bikeId" : 20949, "duracaoMedia" : 404 }
*/
