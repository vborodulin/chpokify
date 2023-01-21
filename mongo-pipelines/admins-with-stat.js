/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $addFields: {
      teamsCount: {
        $size: '$teams',
      },
      participantsCount: {
        $size: '$participants',
      },
    },
  }, {
    $unwind: {
      path: '$participants',
    },
  }, {
    $match: {
      'participants.role': 2,
    },
  }, {
    $lookup: {
      from: 'users',
      localField: 'participants.userId',
      foreignField: '_id',
      as: 'user',
    },
  }, {
    $unwind: {
      path: '$user',
    },
  }, {
    $lookup: {
      from: 'pokersessions',
      foreignField: 'spaceId',
      localField: '_id',
      as: 'pokersessions',
    },
  }, {
    $lookup: {
      from: 'stories',
      localField: '_id',
      foreignField: 'spaceId',
      as: 'stories',
    },
  }, {
    $addFields: {
      pokerSessionsCount: {
        $size: '$pokersessions',
      },
      storiesCount: {
        $size: '$stories',
      },
      lastPokerSessionDate: {
        $max: '$pokersessions.updatedAt',
      },
    },
  }, {
    $group: {
      _id: '$user._id',
      username: {
        $last: '$user.username',
      },
      email: {
        $last: '$user.email',
      },
      createdAt: {
        $last: '$user.createdAt',
      },
      spacesCount: {
        $sum: 1,
      },
      teamsCount: {
        $sum: '$teamsCount',
      },
      participantsCount: {
        $sum: '$participantsCount',
      },
      pokerSessionsCount: {
        $sum: '$pokerSessionsCount',
      },
      storiesCount: {
        $sum: '$storiesCount',
      },
      lastPokerSessionDate: {
        $max: '$lastPokerSessionDate',
      },
    },
  }, {
    $out: 'results',
  },
];

MongoClient.connect(
  'mongodb://root:8TPDctkeA2M3JU59@164.90.194.7:27018/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (connectErr, client) => {
    assert.equal(null, connectErr);
    const coll = client.db('poker').collection('spacers');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  }
);
