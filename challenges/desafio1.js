/* Ajude a Trybe a escolher um filme para a próxima noite! Baseado em uma pesquisa, decidimos que os filmes em potencial devem atender aos seguintes critérios:
- imdb.rating deve ser ao menos 7; ($gte)
- genres não deve conter Crime ou Horror; ($nin)
- rated deve ser igual a PG ou G; ($in)
- languages contém English e Spanish. ($all)
Utilizando a coleção movies, faça um pipeline que retorne todos esses filmes.
Sua query deve retornar 41 documentos. */

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] }
    }
  }
]);

// o pipeline é um array; cada linha é como se fosse uma query;
// o operador $match filtra documentos da mesma forma que os filtros do método find();
// é sempre recomendado que o operador $match esteja no começo do pipeline;
// o operador $all seleciona todos os documentos em que o valor do campo é um array que contenha todos os elementos especificados;
// o operador $in	seleciona qualquer um (any) dos valores especificados no array; funciona similar ao operador $or;
// o operador $nin seleciona nenhum (none) dos valores especificados no array; funciona similar ao operador $nor;
