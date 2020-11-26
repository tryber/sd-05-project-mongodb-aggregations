db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-11T00:00:00Z"),
      },
    },
  },
  {
    $addFields: {
      duracao: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },
  { $group: { _id: null, media: { $avg: "$duracao" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$media" } } },
]);
