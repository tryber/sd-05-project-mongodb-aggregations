// ##### Desafio 4

// Nosso dataset de filmes tem muitos documentos diferentes,
// alguns com títulos "mais complexos" do que outros.
// Se quisermos analisar nossa coleção para encontrar títulos
// de filmes que têm uma só palavra no título, poderíamos buscar
// todos os filmes do dataset e processar isso na aplicação,
// mas o `Aggregation Framework` nos permite fazer isso diretamente no lado do banco de dados.

// Crie um _pipeline_ que adicione um campo `title_split`
// contendo a lista de palavras presentes em `title`
// e retorne apenas o novo campo `title_split` dos filmes com o título composto apenas de uma palavra,
// ordernando-os por `title` em ordem alfabética. Por exemplo, `"Cinderela"` e `"3-25"`
// devem entrar nessa contagem, mas `"Cast Away"` não.

// Dica: utilize os operadores `$split`, `$size` e `$sort` para te auxiliar.
// [Documentação do $split](https://docs.mongodb.com/manual/reference/operator/aggregation/split/)

// Sua query deve retornar `8068` documentos.
db.movies.aggregate([
  {
    $addFields:
    {
      title_split: { $split: ["$title", " "] }
    },
  },
  {
    $match: { title_split: { $size: 1 } },
  },
  { $project: { title_split: 1, _id: 0 } },
  { $sort: { title_split: 1 } },
]);
