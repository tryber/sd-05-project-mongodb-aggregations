// utilizando o mesmo pipeline anterior, retorne apenas os campos title, rated, imdb.rating, imdb.votes
// e year, modificando seus nomes para titulo, avaliado, notaIMDB, votosIMDB e ano, respectivamente.

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      languages: { $all: ["English", "Spanish"] },
      rated: { $in: ["PG", "G"] },
      genres: { $nin: ["Crime", "Horror"] },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);
