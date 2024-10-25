const QueryKeywords = require('../../models/QueryKeyword');

exports.getPopularQueryKeywords = async (req, res) => {
  try {
    const ans = await QueryKeywords.aggregate([
      {
        $group: {
          _id: '$keyword',
          count: { $sum: '$count' },
          name: { $first: '$keyword' },
        },
      },
      {
        $sort: {
          count: -1,
          name: 1,
        },
      },
      { $limit: 30}
    ]);
    res.status(200).json(ans);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'internal server error' });
  }
};

exports.getUsersAnalysisbyKeywords = async (req, res) => {
  try {
    console.log(req.query);
    const { k: keyword, uid: userId } = req.query;

    if (!keyword && !userId) {
      throw new Error('both keyword and userId empty');      
    }


    const matchQuey = {}
    if(keyword) matchQuey.keyword = keyword
    if(userId) matchQuey.userId = userId

    const ans = await QueryKeywords.aggregate([
      { $match: matchQuey },
      {
        $sort: {
          count: -1,
          name: 1,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            userId: '$userId',
          },
          pipeline: [
            { $addFields: { user_id: { $toString: '$_id' } } },
            {
              $match: {
                $expr: {
                  $eq: ['$user_id', '$$userId'],
                },
              },
            },
            {
              $project: {
                password: 0,
                payment: 0,
                role: 0,
                _id: 0,
                medConcerns: 0,
                searchHistory: 0,
                deactivated: 0,
                createDate: 0,
                intro: 0,
              },
            },
          ],
          as: 'user',
        },
      },
    ]);

    console.log(ans);

    res.status(200).json({ keyword, users: ans });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'internal server error' });
  }
};
