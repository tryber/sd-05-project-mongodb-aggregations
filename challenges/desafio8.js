// Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747 ou um Airbus A380 (que estão abreviados para 747 e 380 no campo airplane na coleção air_routes, respectivamente), e descubra qual delas tem o maior número de rotas com esses aviões

db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { companyName: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: {
              $eq: ["$airline.name", "$$companyName"],
            },
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $unwind: "$routes",
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
