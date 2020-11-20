db.trips.aggregate([
  {
    $addFields: {
      durationTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      averageDuration: {
        $avg: "$durationTime",
      },
    },
  },
  {
    $sort: {
      averageDuration: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: ["$averageDuration", 60 * 1000],
        },
      },
    },
  },
]);
