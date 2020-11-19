const milisec = 1000;
const sec = 60;

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.0Z"),
        $lt: ISODate("2016-03-11T00:00:00.0Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, milisec * sec] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos"] },
    },
  },
]);
