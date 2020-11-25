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
      tempoVoo: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  { $group: { duracaoMediaEmMinutos: { $avg: "$tempoVoo" }, _id: null } },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
