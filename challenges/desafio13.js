db.trips.aggregate([
  { $match: { startTime: {
    $gte: ISODate("2016-03-10T00:00:00.000Z"),
    $lt: ISODate("2016-03-11T00:00:00.000Z"),
  } } },
  { $group:
    {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg:
      { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $round: [{ $divide: ["$duracaoMediaEmMinutos", 1000 * 60] }, 0] } } },
]);
