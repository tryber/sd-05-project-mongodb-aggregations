/* DESAFIO 5
Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe quais são
seus atores ou atrizes preferidos. Aqui está o resultado:
- Sandra Bullock
- Tom Hanks
- Julia Roberts
- Kevin Spacey
- George Clooney

Para filmes lançados nos Estados Unidos (campo countries), com tomatoes.viewer.rating
maior ou igual a 3, crie um novo campo chamado num_favs, que represente quantos atores
ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast) do filme.
Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.
Por fim, utilizando o mesmo pipeline, responda: Qual o título do vigésimo quinto filme
do resultado dessa agregação?

Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore
operadores como $size e $setIntersection.
O resultado da sua query deve ter o seguinte formato:
    { "title" : <nome_do_filme> }
*/

const actors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $exists: true } },
      ],
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: { $setIntersection: ["$cast", actors] },
      },
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
      _id: false,
      title: true,
    },
  },
]);

/* LIÇÕES
- diferença entre o operador $count e operador $size:
$size: conta e retorna o total de números de itens de um array;
$count: passa para o próximo estágio da pipeline um documento que que contém
a contagem de documentos;
- operador $setIntersection: passando 2 ou mais arrays como input, esse operador irá
criar um novo array contendo apenas os elementos comuns entre os arrays de input;
https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
- para retornar apenas o 25º elemento: pular os primeiros 24 resultados e exibir um;
precisa ser necessariamente $skip primeiro e $limit depois, senão não dá certo;
- $project utilizando false/true ao invés de 0/1 para variar um pouco;
- consultei o pull request da Renata e vi que utilizava o operador $and,
fiz da mesma forma e passou a funcionar para mim;
https://docs.mongodb.com/manual/reference/operator/aggregation/and/
*/
