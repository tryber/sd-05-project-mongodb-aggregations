/* DESAFIO 10
Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas
decimais e a média de viagens ordenada de forma crescente. Para arredondar a média use o $round.

O resultado da sua query deve ter o seguinte formato:
    { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
*/

const milisec = 1000;
const sec = 60;
const min = 60;

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [{
            $subtract: ["$stopTime", "$startTime"],
          }, milisec * sec * min],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);

/* LIÇÕES
- o $group agrupa resultados por $usertype (Subscriber ou Customer) e cria o campo duracaoMedia;
- $subtract obtém a diferença do horário de saída e horário de chegada;
- as multiplicações e divisão convertem os valores para hora;
- as consts foram criadas para melhor legibilidade do código e por inspiração
no código do colega Felipe Vieira;
- $sort de forma crescente (valor: 1);
*/

/* RESULTADO
{ "tipo" : "Subscriber", "duracaoMedia" : 0.22 }
{ "tipo" : "Customer", "duracaoMedia" : 0.71 }
*/
