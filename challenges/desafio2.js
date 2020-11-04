// A escolha do filme da noite foi um sucesso, mas infelizmente ficamos com nossa banda de internet quase esgotada,
// e ainda precisamos de uma nova recomendação de filme. Para diminuir o volume de dados trafegados, utilizando o
// mesmo pipeline anterior, retorne apenas os campos title, rated, imdb.rating, imdb.votes e year,
// modificando seus nomes para titulo, avaliado, notaIMDB, votosIMDB e ano, respectivamente.

//Adição do $project para alterar os nomes dos documentos retornados

db.movies.aggregate([
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      "imdb.rating": { $gte: 7 },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
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
