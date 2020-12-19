db.trips.aggregate([
  {
    $addFields: {
      hourInterval: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000 * 60,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$hourInterval",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
