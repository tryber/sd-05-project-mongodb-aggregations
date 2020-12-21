const millisec = 1000;
const sec = 60;
const min = 60;

db.trips.aggregate(
  [
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
            $divide: [{
              $subtract: ["$stopTime", "$startTime"],
            },
            millisec * sec * min,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: { $round: ["$duracaoMedia", 2] },
      },
    },
    {
      $sort: { duracaoMedia: 1 },
    },
  ],
);
