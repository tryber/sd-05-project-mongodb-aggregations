const favs = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "Gerge Clooney",
];

db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "EUA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $in: favs } },
      ],
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: ["$cast", favs],
        },
      },
    },
  },
  {
    $project: {
      num_favs: true,
      "tomatoes.viewer.rating": true,
      title: true,
      _id: false,
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: true,
      _id: false,
    },
  },
]);
