// Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747 ou
// um Airbus A380 (que estão abreviados para 747 e 380 no
// campo airplane na coleção air_routes, respectivamente)
// descubra qual delas tem o maior número de rotas com esses aviões.

// O resultado da sua query deve ter o seguinte formato:

// { "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> }

// Importante: join info da collection air_routes com a collection air_alliance por meio do lookup
// Uso do $unwind pra quebrar as rotasAereas e acessar nos outros estágios
// Pra retornar o maior nº sort decrescente com o limit

db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "rotasAereas",
    },
  },
  { $unwind: "$rotasAereas" },
  { $match: { "rotasAereas.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $project: { _id: 1, totalRotas: 1 } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
