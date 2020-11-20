// Referências:
// https://docs.mongodb.com/manual/reference/operator/aggregation/subtract/
// https://stackoverflow.com/questions/48369419/how-to-subtract-two-date-time-in-mongodb
// https://stackoverflow.com/questions/50088576/mongoerror-the-subtract-accumulator-is-a-unary-operator
// https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
// https://docs.mongodb.com/manual/reference/operator/aggregation/divide/

db.trips.aggregate([
  {
    $addFields: {
      duracaoMedia: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracaoMedia" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", 60 * 60 * 1000] }, 2],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
