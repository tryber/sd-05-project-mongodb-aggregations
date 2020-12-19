db.air_alliances.aggregate([
  {
    $unwind: {
      path: "$airlines",
    },
  },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "voos",
    },
  },
  {
    $unwind: {
      path: "$voos",
    },
  },
  {
    $match: {
      "voos.airplane": { $in: ["747", "380"] },
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
      totalRotas: 1,
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
