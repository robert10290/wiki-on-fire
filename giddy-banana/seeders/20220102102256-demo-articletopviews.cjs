"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    var arttopviews = [];
    for (let i = 0; i < 100; i++) {
      const today = new Date();
      const date = new Date();
      date.setDate(today.getDate() - ~~(i / 10));
      arttopviews.push({
        ArticleId: (i % 10) + 1,
        date: date,
        rank_position: (i % 10) + 1,
        number_of_views: Math.trunc(1000 * Math.random()),
        createdAt: today,
        updatedAt: today,
      });
    }

    await queryInterface.bulkInsert("ArticleTopViews", arttopviews);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("ArticleTopViews", null, {});
  },
};
