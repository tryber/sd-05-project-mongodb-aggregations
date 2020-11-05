db.trips.aggregate(
  [
    { $addFields: { duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } } },
    { $group: { _id: "$bikeid", duracaoMedia: { $avg: "$duracao" } } },
    { $project: { _id: 1, duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" } } },
    { $sort: { duracaoMediaEmMinutos: -1 } },
    { $limit: 5 },
    { $project: { _id: 0, bikeId: "$_id", duracaoMedia: "$duracaoMediaEmMinutos" } },
  ],
);
