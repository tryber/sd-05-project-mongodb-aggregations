db.air_alliances.aggregate([
  { $unwind: "$airlines" }, // desestrutura o array da matriz
  {
    $lookup: { // add um novo campo no arry
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "airlines",
    },
  },
  { $unwind: "$airlines" }, // desestrutura o array
  {
    $match: { // retorna os que contenha os elementos especificados
      "airlines.airplane": { $in: ["747", "380"] }, // seleciona os elementos com campos igual (in) a especificadaS
    },
  },
  {
    $group: { //  agrupa elementos distintos
      _id: "$name",
      totalRotas: { $sum: 1 }, // retorna a soma de valores
    },
  },
  { $sort: { totalRotas: -1 } }, // ordena descrescentemente
  { $limit: 1 }, // limitando a um campo
]);
