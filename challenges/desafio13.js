db.trips.aggregate([
  {
    $match: {
      startTime: { $eq: Date("2016-03-10") },
    },
  },
]).pretty();

// 10/03/2016
// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
