const secInMin = 60;
const milInSecon = 1000;
const constant = secInMin * milInSecon;

db.trips.aggregate([
  {
    $addFields: {
      year: { $year: "$startTime" },
      month: { $month: "$startTime" },
      day: { $dayOfMonth: "$startTime" },
    },
  },
  {
    $match: {
      $and: [
        { year: { $eq: 2016 } },
        { month: { $eq: 3 } },
        { day: { $eq: 10 } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, constant],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    },
  },
]);
