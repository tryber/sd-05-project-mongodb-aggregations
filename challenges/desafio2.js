/* A escolha do filme da noite foi um sucesso, mas infelizmente ficamos com nossa banda de internet quase esgotada, e ainda precisamos de uma nova recomendação de filme.
Para diminuir o volume de dados trafegados, utilizando o mesmo pipeline anterior, retorne apenas os campos title, rated, imdb.rating, imdb.votes e year,
modificando seus nomes para titulo, avaliado, notaIMDB, votosIMDB e ano, respectivamente. */

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] }
    }
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
  }
]);

// o operador $project passa adiante no pipeline apenas alguns campos dos documentos vindos do estágio anterior, fazendo isso por meio de uma "projeção", similar ao método find().
// o campo _id é padrão e é o único que necessita de uma negação explícita para que não seja incluído no documento de saída;
// a renomeação dos campos é feita com a declaração explícita acima (novo_nome: "$antigo_nome");
