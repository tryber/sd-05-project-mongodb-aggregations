db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg:
        {
          $subtract: [
            "$stopTime", "$startTime",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: [
            // dividindo por 60.000 para
            // transformar milisegundos em minutos
            "$duracaoMedia", 60000,
          ],
        },
      },
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
]).pretty();
