const arrayMatching = [
  {
    idOld: 'fibonacci',
    idNew: 'Fibonacci',
  },
  {
    idOld: 'modifiedFibonacci',
    idNew: 'Modified Fibonacci',
  },
  {
    idOld: 'linear',
    idNew: 'Linear',
  },
  {
    idOld: 'progression',
    idNew: 'Progression',
  },
  {
    idOld: 'precision',
    idNew: 'Precision',
  },
  {
    idOld: 'idealDays',
    idNew: 'Ideal days',
  },
];

module.exports = {
  async up(db) {
    const cardDecks = await db.collection('pokercarddecks')
      .find({ default: true }, { projection: { title: 1 } })
      .toArray();

    if (cardDecks.length > 0) {
      for (const el of arrayMatching) {
        const findDeck = cardDecks.find((item) => item.title === el.idNew);

        if (findDeck) {
          await db.collection('pokersessions')
            .updateMany({ cardSetId: el.idOld }, {
              $set: { cardSetId: findDeck._id },
            });
        }
      }
    }
  },
};
