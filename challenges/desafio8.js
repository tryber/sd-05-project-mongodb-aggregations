db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { companies: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: {
              $eq: ["$airline.name", "$$companies"],
            },
          },
        },
      ],
      as: "filtro",
    },
  },
  {
    $match: {
      filtro: { $not: { $size: 0 } },
    },
  },
  {
    $unwind: "$filtro",
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
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
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
]);
