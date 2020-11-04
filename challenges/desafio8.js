// Liste todas as parcerias da coleção air_alliances (db.air_alliances.aggregate)
// que voam rotas com um Boing 747 ou um Airbus A380 (MATCH)
// que estão abreviados para 747 e 380 no campo airplane na coleção air_routes(join via LOOKUP)
// (UNWIND para quebrar array de rotas e poder trabalhar nelas nos proximos estagios)
// e descubra qual delas tem o maior número de rotas com esses aviões. (SORT - 1 + LIMIT)

// O resultado da sua query deve ter o seguinte formato:
// { "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> } 
// (GROUP para calcular o totalRotas)
// (PROJECT para dizer quais campos aparecem)

db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "rotas",
    },
  },
  { $unwind: "$rotas" },
  { $match: { "rotas.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $project: { _id: 1, totalRotas: 1 } },
  { $sort: { totalRotas: - 1 } },
  { $limit: 1 },
]);

// retorna { "_id" : "SkyTeam", "totalRotas" : 8 }
