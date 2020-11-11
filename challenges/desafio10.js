db.trips.aggregate([
  { $match: {
    usertype: { $exists: true } },
  },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] } } },
  { $sort: { tipo: -1 } },
]);
