db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $project: { _id: 0 } },
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "interAir",
  } },
  { $unwind: "$interAir" },
  { $match: { "interAir.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
