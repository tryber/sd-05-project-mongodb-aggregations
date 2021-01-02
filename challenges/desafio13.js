db.trips.aggregate([
  {
    $match: {
      startTime: {
        $lt: ISODate("2016-03-11T00:00:00Z"),
        $gte: ISODate("2016-03-10T00:00:00Z"),
      },
    },
  },
  {
    $group: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
      _id: 0,
    },
  },
]);
