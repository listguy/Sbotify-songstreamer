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
    await queryInterface.bulkInsert("Songs_In_Playlists", [
      {
        id: 1,
        playlist_id: 1,
        song_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        playlist_id: 1,
        song_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        playlist_id: 1,
        song_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        playlist_id: 2,
        song_id: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        playlist_id: 2,
        song_id: 13,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        playlist_id: 1,
        song_id: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        playlist_id: 2,
        song_id: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        playlist_id: 1,
        song_id: 16,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        playlist_id: 2,
        song_id: 17,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        playlist_id: 1,
        song_id: 18,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 11,
        playlist_id: 2,
        song_id: 19,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 12,
        playlist_id: 1,
        song_id: 23,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 13,
        playlist_id: 1,
        song_id: 28,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 14,
        playlist_id: 1,
        song_id: 45,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 15,
        playlist_id: 1,
        song_id: 50,
        created_at: new Date(),
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
    await queryInterface.bulkDelete("Songs_In_Playlists", null, {});
  },
};
