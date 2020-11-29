/* DESAFIO 3
Agora que você tem os campos essenciais, retorne esses filmes ordenados por
ano e nota IMDB de forma decrescente
e o título por ordem alfabética (nesta ordem de desempate). */

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
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
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);

/* LIÇÕES:
- o operador $sort retorna os inputs na ordem desejada;
- valor -1 para ordem ascendente;
- valor 1 para ordem descentente;
- a ordem importa considerando como os fatores foram listados;
- referência: documentação oficial
https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
*/
