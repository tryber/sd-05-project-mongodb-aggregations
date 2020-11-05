db.trips.aggregate(
  [
    { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
    { $group: { _id: "$diaDaSemana", total: { $sum: 1 } } },
    { $project: { _id: 0, _diaDaSemana: "$_id", _total: "$total" } },
    { $project: { diaDaSemana: "$_diaDaSemana", total: "$_total" } },
    { $sort: { total: -1 } },
    { $limit: 1 },
  ],
);
//  https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/index.html
//  https://stackoverflow.com/questions/35254128/is-it-possible-to-get-the-fields-in-the-order-of-projection-in-aggregation-frame
