db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes", // Coleção externa
      localField: "airlines", // Array de comparação
      foreignField: "airline.name", // Campo da coleção externa para comparar
      as: "routes",
    },
  },
  {
    $unwind: {
      path: "$routes",
    },
  },
  {
    $match: {
      "routes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
