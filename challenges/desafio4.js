db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: { $split: [ "$title", " " ] }
    }
  },
  {
    $redact: {
      $cond: {
        if: { $eq: [ { $size: "$title_split" }, 1 ] },
        then: "$$DESCEND",
        else: "$$PRUNE"
      }
    }
  },
  { $sort: { title: 1 } }
]);
