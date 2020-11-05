db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T23:59:59Z"),
      },
    },
  },
  {
    $addFields: {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
      _id: 0,
    },
  },
]);

// 10/03/2016
// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
