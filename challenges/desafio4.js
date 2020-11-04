// Crie um pipeline que adicione um campo title_split
// contendo a lista de palavras presentes em title
// e retorne apenas (PROJECT) o novo campo title_split dos filmes
// com o título composto apenas de uma palavra (MATCH),
// ordernando-os (SORT) por title em ordem alfabética.
// Por exemplo, "Cinderela" e "3-25" devem entrar nessa contagem,
// mas "Cast Away" não.

// Dica: utilize os operadores $split, $size e $sort para te auxiliar.

db.movies.aggregate([
  {
    $addFields: {
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
  {
    $sort: {
      titulo: 1,
    },
  },
]);
