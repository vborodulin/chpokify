module.exports = {
  async up(db) {
    const cardDecksModel = await db.collection('pokercarddecks');
    const objectSetData = {
      $set: {
        'cards.$.value': null,
      },
    };

    await Promise.all([
      cardDecksModel.updateMany(
        { 'cards.name': '?' },
        objectSetData
      ),
      cardDecksModel.updateMany(
        { 'cards.icon': 'IconCoffee' },
        objectSetData
      ),
    ]);
  },
};
