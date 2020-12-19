// https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "flight_routes",
    },
  },
  {
    $unwind: "$flight_routes",
  },
  {
    $match: {
      "flight_routes.airplane": {
        $in: ["747", "380"],
      },
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
      _id: true,
      totalRotas: true,
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
