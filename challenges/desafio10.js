// Switched from $addFields to $group to simplify this query
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            },
            60 * 60 * 1000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: false,
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
