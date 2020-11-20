// Referências:
// https://stackoverflow.com/questions/31071999/date-comparison-in-mongodb
// https://stackoverflow.com/questions/2943222/find-objects-between-two-dates-mongodb
// https://stackoverflow.com/questions/29756262/calculate-the-average-value-of-a-mongodb-document

db.trips.aggregate([
  {
    $match: {
      $and: [
        { startTime: { $gte: new Date("2016-03-10") } },
        { startTime: { $lt: new Date("2016-11-02") } },
      ],
    },
  },
  {
    $addFields: {
      durationTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: null,
      averageTime: { $avg: "$durationTime" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$averageTime", 60 * 1000],
        },
      },
    },
  },
]);
