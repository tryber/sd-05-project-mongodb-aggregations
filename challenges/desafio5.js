// Para filmes lançados nos Estados Unidos (campo countries),
// com tomatoes.viewer.rating maior ou igual a 3 (MATCH),

// Crie um novo campo chamado num_favs (ADDFIELDS)
// que represente quantos atores ou atrizes da nossa lista de favoritos
// aparecem no elenco (campo cast) do filme. (MATCH interno)
// (Dica: coloque a lista de atores e atrizes favoritos em uma variável
// e explore operadores como $size e $setIntersection.)

// Ordene os resultados por num_favs, tomatoes.viewer.rating e title,
// todos em ordem decrescente. (SORT com -1)

// Por fim, responda: Qual o título do vigésimo quinto filme
// do resultado dessa agregação?(SKIP + LIMIT)

// O resultado da sua query deve ter o seguinte formato:
// { "title" : <nome_do_filme> } (PROJECT)

const favActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      favActorsInCast: {
        $setIntersection: [favActors, "$cast"],
      },
    },
  },
  {
    $match: {
      favActorsInCast: { $ne: null },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$favActorsInCast" },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);

// retorna { "title" : "The Heat" }
