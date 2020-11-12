db.trips.aggregate([
  {
    $match: {
      usertype: { $exists: true },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            3600 * 1E3,
          ],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: false,
    },
  },
]);
