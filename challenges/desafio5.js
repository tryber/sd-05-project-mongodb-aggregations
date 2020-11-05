db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      castList: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    },
  },
  {
    $addFields: {
      intersectCastList: {
        $setIntersection: ["$cast", "$castList"],
      },
    },
  },
  {
    $match: {
      intersectCastList: {
        $ne: null,
      },
    },
  },
  {
    $addFileds: {
      num_favs: {
        $size: "$intersectCastList",
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
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
