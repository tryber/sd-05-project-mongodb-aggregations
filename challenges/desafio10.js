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
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
