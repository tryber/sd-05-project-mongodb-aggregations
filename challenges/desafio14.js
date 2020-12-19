db.trips.aggregate([
  {
    $addFields: {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
      _id: 0,
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);

// transparencia: para o requisito 11 e 12, precisei ver o comentário/commit "change projection from true to value" do colega Paulo DAndrea
