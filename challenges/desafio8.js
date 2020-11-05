db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "routesInfo",
    },
  },
  {
    $match: {
      "routesInfo.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      "totalRotas": { $sum: 1 },
    },
  },
]);
