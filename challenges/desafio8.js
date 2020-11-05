//  levou 1.9s :
db.air_alliances.aggregate(
  [
    { $unwind: "$airlines" },
    {
      $lookup: { from: "air_routes", localField: "airlines", foreignField: "airline.name", as: "rotas" },
    },
    { $unwind: "$rotas" },
    { $match: { "rotas.airplane": { $in: ["747", "380"] } } },
    { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 },
  ],
);

//  outra resolucao com menor perfomance, levou 2.6 s:
// db.air_alliances.aggregate(
//   [
//     { $unwind: "$airlines" },
//     { $lookup:
//       {
//         from: "air_routes",
//         let: { referenciaNomeCia: "$airlines" }, // ref ao air_alliances
//         pipeline:
//         [
//           { $match:
//             { $expr:
//               {
//                 $and:
//                   [
//                     {$eq: ["$$referenciaNomeCia", "$airline.name"] },
//                     {$or: [{$eq: ["$airplane", "747" ] }, {$eq: ["$airplane", "380" ] }] },
//                   ]
//               }
//             }
//           }
//         ],
//         as: "rotas",
//       }
//     },
//     { $unwind: "$rotas" },
//     { $match: { "rotas.airplane": { $in: ["747", "380"] } } },
//     { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
//     { $sort: { totalRotas: -1 } },
//     { $limit: 1 },
//   ],
// );

//  https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
