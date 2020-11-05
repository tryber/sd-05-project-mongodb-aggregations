db.trips.aggregate(
  [
    { $match: { startTime: { $gte: ISODate("2016-03-10T00:00:00Z"), $lt: ISODate("2016-03-11T00:00:00Z") } } },
    { $addFields: { duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } } },
    { $group: { _id: null, duracaoMedia: { $avg: "$duracao" } } },
    { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" } } },
  ],
);
//  https://stackoverflow.com/questions/19819870/date-query-with-isodate-in-mongodb-doesnt-seem-to-work
