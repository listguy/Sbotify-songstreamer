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
    await queryInterface.bulkInsert("Playlists", [
      {
        id: 1,
        title: "Favorites",
        media:
          "https://25yearslatersite.com/wp-content/uploads/2019/12/favorites.jpg",
        uploaded_at: "2020-09-13",
        created_at: "2020-09-12",
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "Avenged Bangers",
        media:
          "https://pbs.twimg.com/profile_images/660679456546246656/j5yxYKd0_400x400.jpg",
        uploaded_at: "2020-09-13",
        created_at: "2019-09-12",
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Playlists", null, {});
  },
};
