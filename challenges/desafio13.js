db.trips.aggregate([
  {
    $match: {
      startTime: { $leq: ISODate("2016-03-10T23:59:59Z") },
      startTime: { $gte: ISODate("2016-03-10T00:00:00Z") },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
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
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: [
            // dividindo por 60.000 para
            // transformar milisegundos em minutos
            "$duracaoMediaEmMinutos", 60000,
          ],
        },
      },
    },
  },
]).pretty();
