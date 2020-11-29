/* DESAFIO 8
Trocando de contexto, vamos utilizar nosso outro dataset que contém dados de empresas aéreas,
suas rotas, seus voos e parcerias.
Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747 ou um Airbus A380
(que estão abreviados para 747 e 380 no campo airplane na coleção air_routes, respectivamente),
e descubra qual delas tem o maior número de rotas com esses aviões.

O resultado da sua query deve ter o seguinte formato:
    { "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> }
*/

db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "arrayRotas",
    },
  },
  {
    $unwind: "$arrayRotas",
  },
  {
    $match: {
      "arrayRotas.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);

/* LIÇÕES
- $lookup permite fazer "join"; o resultado da junção é um array com os elementos que deram "match";
existem 4 parâmetros básicos: "from" (coleção p/ fazer join), "localField" e "foreignField" (campos
de comparação), "as" (nome do novo array);
- uso do $unwind pra fazer o "spread" do array obtido no estágio anterior (que era o join);
- no estágio do $group vai ser feito a soma do total de rotas;
- $sort: -1 para ordem ascendente; $limit pra encontrar o #1;
*/
