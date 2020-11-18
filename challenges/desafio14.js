db.trips.aggregate([
  { $addFields: {
    tempoVoo: {
      $divide: [{
        $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } } },
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: "$tempoVoo" },
  } },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1 } },
  { $limit: 5 },
]).pretty();
